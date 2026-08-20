import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { UsuarioAuth } from '../auth/auth.types';
import { AlquileresService } from '../alquileres/alquileres.service';
import {
  CambiarEstadoCotizacionDto,
  ConvertirCotizacionDto,
  CrearCotizacionDto,
  ESTADOS_COTIZACION,
} from './dto/cotizaciones.dto';

const EQUIPO_SELECT = {
  id: true,
  codigoInterno: true,
  nombre: true,
  precio: true,
  imagenUrl: true,
  tipo: true,
  marca: true,
  modelo: true,
  unidad: true,
} as const;

const INCLUDE_ITEMS = {
  items: {
    include: {
      equipo: { select: EQUIPO_SELECT },
    },
  },
  contrato: { select: { id: true, numero: true } },
} as const;

type CotizacionConItems = Prisma.CotizacionGetPayload<{
  include: typeof INCLUDE_ITEMS;
}>;

export interface CotizacionDetalle {
  id: string;
  clienteNombre: string;
  clienteEmpresa: string | null;
  clienteEmail: string;
  clienteTelefono: string;
  mensaje: string | null;
  totalEstimado: number | null;
  estado: string;
  proformaConfig?: any;
  createdAt: Date;
  items: {
    id: string;
    cantidad: number;
    precioUnitario?: number | null;
    equipo: {
      id: string;
      codigoInterno: string | null;
      nombre: string;
      precio: number | null;
      imagenUrl: string;
      tipo: string;
      marca: string | null;
      modelo: string | null;
      unidad: string | null;
    };
  }[];
  contrato: { id: string; numero: string } | null;
}

@Injectable()
export class CotizacionesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditoria: AuditoriaService,
    private readonly alquileres: AlquileresService,
  ) {}

  // Normaliza los Decimal de Prisma a number para el frontend
  private mapear(c: CotizacionConItems): CotizacionDetalle {
    return {
      id: c.id,
      clienteNombre: c.clienteNombre,
      clienteEmpresa: c.clienteEmpresa,
      clienteEmail: c.clienteEmail,
      clienteTelefono: c.clienteTelefono,
      mensaje: c.mensaje,
      totalEstimado: c.totalEstimado != null ? Number(c.totalEstimado) : null,
      estado: c.estado,
      proformaConfig: c.proformaConfig,
      createdAt: c.createdAt,
      items: c.items.map((i) => ({
        id: i.id,
        cantidad: i.cantidad,
        precioUnitario: i.precioUnitario != null ? Number(i.precioUnitario) : null,
        equipo: {
          ...i.equipo,
          precio: i.equipo.precio != null ? Number(i.equipo.precio) : null,
        },
      })),
      contrato: c.contrato,
    };
  }

  // ---- PÚBLICO: recibe solicitudes desde el sitio web ----
  async crear(dto: CrearCotizacionDto) {
    if (!dto.clienteNombre?.trim()) {
      throw new BadRequestException('El nombre del cliente es obligatorio');
    }
    if (!dto.clienteEmail?.trim() || !/^\S+@\S+\.\S+$/.test(dto.clienteEmail)) {
      throw new BadRequestException('Correo electrónico inválido');
    }
    if (!dto.clienteTelefono?.trim()) {
      throw new BadRequestException('El teléfono es obligatorio');
    }
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException(
        'La cotización debe incluir al menos un equipo',
      );
    }

    // Solo se aceptan equipos que existan en el catálogo
    const ids = dto.items.map((i) => i.equipoId);
    const equipos = await this.prisma.equipo.findMany({
      where: { id: { in: ids } },
      select: { id: true, nombre: true, codigoInterno: true, precio: true },
    });
    const porId = new Map(equipos.map((e) => [e.id, e]));

    // Agrupar cantidades por equipo (evita filas duplicadas si llegan ítems repetidos)
    const cantidades = new Map<string, number>();
    for (const i of dto.items) {
      if (!porId.has(i.equipoId)) continue;
      const cantidad = Math.max(1, Math.floor(Number(i.cantidad) || 1));
      cantidades.set(i.equipoId, (cantidades.get(i.equipoId) ?? 0) + cantidad);
    }
    const itemsValidos = [...cantidades.entries()].map(
      ([equipoId, cantidad]) => ({
        equipoId,
        cantidad,
      }),
    );
    if (itemsValidos.length === 0) {
      throw new BadRequestException(
        'Ninguno de los equipos seleccionados es válido',
      );
    }

    // El total estimado se calcula con los precios de la BD (no se confía en el cliente)
    let subtotal = 0;
    const itemsData = itemsValidos.map((i) => {
      const precio = Number(porId.get(i.equipoId)?.precio ?? 0);
      subtotal += precio * i.cantidad;
      return i;
    });
    const totalEstimado = Math.round(subtotal * 1.18 * 100) / 100;

    const cotizacion = await this.prisma.cotizacion.create({
      data: {
        clienteNombre: dto.clienteNombre.trim(),
        clienteEmpresa: dto.clienteEmpresa?.trim() || null,
        clienteEmail: dto.clienteEmail.trim(),
        clienteTelefono: dto.clienteTelefono.trim(),
        mensaje: dto.mensaje?.trim() || null,
        totalEstimado: new Prisma.Decimal(totalEstimado),
        items: { create: itemsData },
      },
      include: INCLUDE_ITEMS,
    });

    return this.mapear(cotizacion);
  }

  // ---- PÚBLICO: Rastreo de ticket para /seguimiento ----
  async track(ticket: string) {
    const clean = ticket.trim().replace(/^TCK-/i, '');
    let cotizacion = await this.prisma.cotizacion.findFirst({
      where: {
        OR: [
          { id: { startsWith: clean.toLowerCase() } },
          { id: { startsWith: clean } },
          { id: ticket.trim() },
        ],
      },
      include: INCLUDE_ITEMS,
    });

    if (!cotizacion) {
      // Buscar por coincidencia parcial si es un UUID o RUC de empresa
      cotizacion = await this.prisma.cotizacion.findFirst({
        where: {
          OR: [
            { clienteEmpresa: { contains: ticket.trim() } },
            { clienteNombre: { contains: ticket.trim() } },
          ],
        },
        include: INCLUDE_ITEMS,
        orderBy: { createdAt: 'desc' },
      });
    }

    if (!cotizacion) {
      throw new NotFoundException('Cotización o Ticket no encontrado');
    }

    const mapData = this.mapear(cotizacion);
    const ticketNum = `TCK-${String(cotizacion.id).substring(0, 8).toUpperCase()}`;

    // Buscar contrato detallado para obtener fechas de inicio y fin de alquiler si existen
    let datosAlquiler: {
      numeroContrato: string;
      fechaInicio: string;
      fechaFin: string;
      diasRestantes: number;
      estadoContrato: string;
    } | null = null;

    if (cotizacion.contratoId) {
      const contrato = await this.prisma.contratoAlquiler.findUnique({
        where: { id: cotizacion.contratoId },
      });
      if (contrato) {
        const hoy = new Date();
        const fin = new Date(contrato.fechaFin);
        const diffMs = fin.getTime() - hoy.getTime();
        const diasRestantes = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        datosAlquiler = {
          numeroContrato: contrato.numero,
          fechaInicio: contrato.fechaInicio.toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          fechaFin: contrato.fechaFin.toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          diasRestantes: diasRestantes > 0 ? diasRestantes : 0,
          estadoContrato: contrato.estado,
        };
      }
    }

    return {
      codigoTicket: ticketNum,
      clienteNombre: mapData.clienteNombre,
      clienteEmpresa: mapData.clienteEmpresa,
      clienteEmail: mapData.clienteEmail,
      clienteTelefono: mapData.clienteTelefono,
      fechaCreacion: mapData.createdAt.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      estado: mapData.estado,
      montoTotal: mapData.totalEstimado,
      proformaConfig: mapData.proformaConfig,
      datosAlquiler,
      items: mapData.items.map((i) => ({
        id: i.id,
        nombre: i.equipo.nombre,
        cantidad: i.cantidad,
        tipo: i.equipo.tipo,
        imagenUrl: i.equipo.imagenUrl,
        codigoInterno: i.equipo.codigoInterno,
        modelo: i.equipo.modelo,
        marca: i.equipo.marca,
        unidad: i.equipo.unidad,
        precio: i.precioUnitario ?? i.equipo.precio,
      })),
    };
  }

  async valorizar(id: string, dto: { config: any, precios: Record<string, number> }) {
    let subtotal = 0;
    
    // Guardar precios unitarios
    for (const [itemId, precio] of Object.entries(dto.precios)) {
      const item = await this.prisma.cotizacionItem.findUnique({ where: { id: itemId } });
      if (item && item.cotizacionId === id) {
        await this.prisma.cotizacionItem.update({
          where: { id: itemId },
          data: { precioUnitario: new Prisma.Decimal(precio) }
        });
        subtotal += precio * item.cantidad;
      }
    }

    const descuento = Number(dto.config.descuento) || 0;
    const flete = Number(dto.config.flete) || 0;
    const embalaje = Number(dto.config.embalaje) || 0;
    const igvPercent = Number(dto.config.igvPercent) || 0;
    const totalNeto = subtotal - descuento;
    const igv = totalNeto * (igvPercent / 100);
    const granTotal = totalNeto + igv + flete + embalaje;

    const cotizacion = await this.prisma.cotizacion.update({
      where: { id },
      data: {
        estado: 'COTIZADA',
        proformaConfig: dto.config,
        totalEstimado: new Prisma.Decimal(granTotal),
      },
      include: INCLUDE_ITEMS,
    });
    return this.mapear(cotizacion);
  }

  // ---- ADMIN: listado ----
  async listar() {
    const cotizaciones = await this.prisma.cotizacion.findMany({
      include: INCLUDE_ITEMS,
      orderBy: { createdAt: 'desc' },
    });
    return cotizaciones.map((c) => this.mapear(c));
  }

  async detalle(id: string) {
    const cotizacion = await this.prisma.cotizacion.findUnique({
      where: { id },
      include: INCLUDE_ITEMS,
    });
    if (!cotizacion) throw new NotFoundException('Cotización no encontrada');
    return this.mapear(cotizacion);
  }

  async cambiarEstado(
    id: string,
    dto: CambiarEstadoCotizacionDto,
    usuario?: UsuarioAuth,
  ) {
    const cotizacion = await this.prisma.cotizacion.findUnique({
      where: { id },
    });
    if (!cotizacion) throw new NotFoundException('Cotización no encontrada');

    const estado = String(dto.estado ?? '').toUpperCase();
    if (
      !ESTADOS_COTIZACION.includes(
        estado as (typeof ESTADOS_COTIZACION)[number],
      )
    ) {
      throw new BadRequestException(
        `Estado inválido. Use: ${ESTADOS_COTIZACION.join(', ')}`,
      );
    }

    await this.prisma.cotizacion.update({
      where: { id },
      data: { estado },
    });

    await this.auditoria.registrar(
      usuario,
      'CAMBIAR_ESTADO_COTIZACION',
      'Cotizacion',
      id,
      {
        cliente: cotizacion.clienteNombre,
        de: cotizacion.estado,
        a: estado,
      },
    );

    return this.detalle(id);
  }

  // ---- CONVERTIR COTIZACIÓN APROBADA EN CONTRATO DE ALQUILER ----
  async convertirAcontrato(
    id: string,
    dto: ConvertirCotizacionDto,
    usuario?: UsuarioAuth,
  ) {
    const cotizacion = await this.prisma.cotizacion.findUnique({
      where: { id },
      include: INCLUDE_ITEMS,
    });
    if (!cotizacion) throw new NotFoundException('Cotización no encontrada');

    if (cotizacion.estado === 'RECHAZADA') {
      throw new BadRequestException(
        'No se puede generar un contrato de una cotización rechazada o cancelada',
      );
    }
    if (cotizacion.contratoId) {
      throw new BadRequestException(
        'Esta cotización ya tiene un contrato generado',
      );
    }
    if (cotizacion.items.length === 0) {
      throw new BadRequestException(
        'La cotización no tiene equipos para generar el contrato',
      );
    }

    const proyecto = dto.proyecto?.trim();
    if (!proyecto) {
      throw new BadRequestException('El proyecto es obligatorio');
    }
    const sede = dto.sede?.trim();
    if (!sede) {
      throw new BadRequestException('La sede es obligatoria');
    }

    // Reutiliza la creación de contratos: numeración HTR-ALQ-XXX,
    // cálculo de IGV y auditoría de CREAR_CONTRATO
    const contrato = await this.alquileres.create(
      {
        clienteNombre: cotizacion.clienteNombre,
        clienteEmpresa: cotizacion.clienteEmpresa || undefined,
        clienteEmail: cotizacion.clienteEmail,
        clienteTelefono: cotizacion.clienteTelefono,
        proyecto,
        sede,
        fechaInicio: dto.fechaInicio,
        fechaFin: dto.fechaFin,
        condiciones: dto.condiciones || undefined,
        observaciones: dto.observaciones || undefined,
        items: cotizacion.items.map((i) => ({
          equipoId: i.equipoId,
          cantidad: i.cantidad,
          precioUnitario:
            i.equipo.precio != null ? Number(i.equipo.precio) : undefined,
        })),
      },
      usuario,
    );

    // Al generar el contrato de alquiler, la cotización pasa automáticamente a APROBADA
    try {
      await this.prisma.cotizacion.update({
        where: { id },
        data: { estado: 'APROBADA', contratoId: contrato.id },
      });
    } catch (e) {
      await this.prisma.contratoAlquiler
        .delete({ where: { id: contrato.id } })
        .catch(() => undefined);
      throw e;
    }

    await this.auditoria.registrar(
      usuario,
      'CONVERTIR_COTIZACION_A_CONTRATO',
      'Cotizacion',
      id,
      {
        cliente: cotizacion.clienteNombre,
        contrato: contrato.numero,
      },
    );

    return {
      cotizacion: this.mapear({
        ...cotizacion,
        estado: 'CONTRATO',
        contrato: { id: contrato.id, numero: contrato.numero },
      }),
      contrato: {
        id: contrato.id,
        numero: contrato.numero,
      },
    };
  }

  async eliminar(id: string, usuario?: UsuarioAuth, passwordConfirm?: string) {
    if (!passwordConfirm) {
      throw new BadRequestException('Se requiere la contraseña de administrador.');
    }

    const usuarioId = usuario?.sub;
    if (!usuarioId) {
      throw new UnauthorizedException('Usuario no autenticado.');
    }

    // Buscar al usuario administrador en la base de datos por ID o por rol ADMINISTRADOR
    let adminBD = usuarioId
      ? await this.prisma.usuario.findUnique({ where: { id: usuarioId } })
      : null;

    if (!adminBD) {
      adminBD = await this.prisma.usuario.findFirst({
        where: { rol: 'ADMINISTRADOR', activo: true },
      });
    }

    if (!adminBD || !adminBD.passwordHash) {
      throw new BadRequestException('No se encontró cuenta de Administrador para validar.');
    }

    const passwordValida = await bcrypt.compare(passwordConfirm.trim(), adminBD.passwordHash);
    if (!passwordValida) {
      throw new BadRequestException('Contraseña de administrador incorrecta.');
    }

    const cotizacion = await this.prisma.cotizacion.findUnique({
      where: { id },
    });
    if (!cotizacion) throw new NotFoundException('Cotización no encontrada');

    // En lugar de un DELETE destructivo que borre el registro,
    // marcamos la cotización como CANCELADA (RECHAZADA) para conservar la trazabilidad auditada
    const cancelada = await this.prisma.cotizacion.update({
      where: { id },
      data: { estado: 'RECHAZADA' },
    });

    await this.auditoria.registrar(
      usuario,
      'CANCELAR_COTIZACION_CON_CLAVE',
      'Cotizacion',
      id,
      { cliente: cotizacion.clienteNombre, motivo: 'Cancelada por Administrador' },
    );

    return { ok: true, cotizacion: this.mapear({ ...cotizacion, estado: 'RECHAZADA', items: [], contrato: null }) };
  }
}
