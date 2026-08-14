import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  ResultadoChecklist,
  EstadoContrato,
  EstadoEquipo,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { UsuarioAuth } from '../auth/auth.types';
import {
  ActualizarContratoDto,
  CambiarEstadoContratoDto,
  CrearContratoDto,
  RegistrarInspeccionDto,
} from './dto/alquileres.dto';

const IGV = 0.18;

type ContratoItemsPayload = Prisma.ContratoAlquilerGetPayload<{
  include: {
    items: {
      include: {
        equipo: {
          select: {
            id: true;
            codigoInterno: true;
            nombre: true;
            estado: true;
            marca: true;
            modelo: true;
            serie: true;
            imagenUrl: true;
            ubicacion: true;
          };
        };
      };
    };
  };
}>;

export interface ContratoConDetalle {
  id: string;
  numero: string;
  clienteNombre: string;
  clienteEmpresa: string | null;
  clienteDocumento: string | null;
  clienteEmail: string;
  clienteTelefono: string;
  proyecto: string;
  sede: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: string;
  subtotal: number | null;
  igv: number | null;
  total: number | null;
  condiciones: string | null;
  observaciones: string | null;
  responsableNombre: string | null;
  createdAt: Date;
  updatedAt: Date;
  items: {
    id: string;
    equipoId: string;
    cantidad: number;
    precioUnitario: number | null;
    subtotal: number | null;
    equipo: {
      id: string;
      codigoInterno: string | null;
      nombre: string;
      estado: string;
      marca: string | null;
      modelo: string | null;
      serie: string | null;
      imagenUrl: string;
      ubicacion: string;
    };
  }[];
  inspecciones?: {
    id: string;
    tipo: string;
    fecha: Date;
    responsableNombre: string | null;
    observaciones: string | null;
    items: {
      id: string;
      descripcion: string;
      resultado: string;
      observacion: string | null;
    }[];
  }[];
}

@Injectable()
export class AlquileresService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditoria: AuditoriaService,
  ) {}

  private async siguienteNumero(): Promise<string> {
    const ultimo = await this.prisma.contratoAlquiler.findFirst({
      orderBy: { numero: 'desc' },
      select: { numero: true },
    });

    const prefijo = 'HTR-ALQ-';
    if (!ultimo?.numero) return `${prefijo}001`;

    const match = ultimo.numero.match(/(\d+)$/);
    const numero = match ? parseInt(match[1], 10) + 1 : 1;
    return `${prefijo}${String(numero).padStart(3, '0')}`;
  }

  // Normaliza los valores Decimal de Prisma a number para el frontend
  private mapearContrato(contrato: ContratoItemsPayload): ContratoConDetalle {
    return {
      id: contrato.id,
      numero: contrato.numero,
      clienteNombre: contrato.clienteNombre,
      clienteEmpresa: contrato.clienteEmpresa,
      clienteDocumento: contrato.clienteDocumento,
      clienteEmail: contrato.clienteEmail,
      clienteTelefono: contrato.clienteTelefono,
      proyecto: contrato.proyecto,
      sede: contrato.sede,
      fechaInicio: contrato.fechaInicio,
      fechaFin: contrato.fechaFin,
      estado: contrato.estado,
      subtotal: contrato.subtotal != null ? Number(contrato.subtotal) : null,
      igv: contrato.igv != null ? Number(contrato.igv) : null,
      total: contrato.total != null ? Number(contrato.total) : null,
      condiciones: contrato.condiciones,
      observaciones: contrato.observaciones,
      responsableNombre: contrato.responsableNombre,
      createdAt: contrato.createdAt,
      updatedAt: contrato.updatedAt,
      items: contrato.items.map((item) => ({
        id: item.id,
        equipoId: item.equipoId,
        cantidad: item.cantidad,
        precioUnitario:
          item.precioUnitario != null ? Number(item.precioUnitario) : null,
        subtotal: item.subtotal != null ? Number(item.subtotal) : null,
        equipo: item.equipo,
      })),
    };
  }

  private async obtenerContrato(id: string) {
    const contrato = await this.prisma.contratoAlquiler.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            equipo: {
              select: {
                id: true,
                codigoInterno: true,
                nombre: true,
                estado: true,
                marca: true,
                modelo: true,
                serie: true,
                imagenUrl: true,
                ubicacion: true,
              },
            },
          },
        },
        inspecciones: {
          include: { items: true },
          orderBy: { fecha: 'desc' },
        },
      },
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');
    return contrato;
  }

  // ---- LISTADO ----
  async findAll() {
    const contratos = await this.prisma.contratoAlquiler.findMany({
      include: {
        items: {
          include: {
            equipo: {
              select: {
                id: true,
                codigoInterno: true,
                nombre: true,
                estado: true,
                marca: true,
                modelo: true,
                serie: true,
                imagenUrl: true,
                ubicacion: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return contratos.map((c) => this.mapearContrato(c));
  }

  // ---- DETALLE ----
  async findOne(id: string) {
    const contrato = await this.obtenerContrato(id);
    return {
      ...this.mapearContrato(contrato),
      inspecciones: contrato.inspecciones,
    };
  }

  // ---- CREAR ----
  async create(dto: CrearContratoDto, usuario?: UsuarioAuth) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException(
        'El contrato debe incluir al menos un equipo',
      );
    }

    const fechaInicio = new Date(dto.fechaInicio);
    const fechaFin = new Date(dto.fechaFin);
    if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
      throw new BadRequestException('Fechas inválidas');
    }
    if (fechaFin < fechaInicio) {
      throw new BadRequestException(
        'La fecha de fin debe ser posterior a la de inicio',
      );
    }

    // Validar equipos existentes
    const equipoIds = dto.items.map((i) => i.equipoId);
    const equipos = await this.prisma.equipo.findMany({
      where: { id: { in: equipoIds } },
      select: { id: true, codigoInterno: true, nombre: true, estado: true },
    });
    if (equipos.length !== equipoIds.length) {
      throw new BadRequestException('Uno o más equipos no existen');
    }

    let subtotal = 0;
    const itemsData = dto.items.map((item) => {
      const precio =
        item.precioUnitario != null ? Number(item.precioUnitario) : 0;
      const cantidad = item.cantidad || 1;
      const sub = precio * cantidad;
      subtotal += sub;
      return {
        equipoId: item.equipoId,
        cantidad,
        precioUnitario:
          item.precioUnitario != null ? new Prisma.Decimal(precio) : null,
        subtotal: new Prisma.Decimal(sub),
      };
    });

    const igv = subtotal * IGV;
    const total = subtotal + igv;

    const numero = await this.siguienteNumero();

    const contrato = await this.prisma.contratoAlquiler.create({
      data: {
        numero,
        clienteNombre: dto.clienteNombre,
        clienteEmpresa: dto.clienteEmpresa || null,
        clienteDocumento: dto.clienteDocumento || null,
        clienteEmail: dto.clienteEmail,
        clienteTelefono: dto.clienteTelefono,
        proyecto: dto.proyecto,
        sede: dto.sede,
        fechaInicio,
        fechaFin,
        subtotal: new Prisma.Decimal(subtotal),
        igv: new Prisma.Decimal(igv),
        total: new Prisma.Decimal(total),
        condiciones: dto.condiciones || null,
        observaciones: dto.observaciones || null,
        responsableNombre: usuario?.nombre || null,
        usuarioId: usuario?.sub || null,
        items: { create: itemsData },
      },
    });

    await this.auditoria.registrar(
      usuario,
      'CREAR_CONTRATO',
      'ContratoAlquiler',
      contrato.id,
      {
        numero,
        cliente: dto.clienteNombre,
        proyecto: dto.proyecto,
        total,
      },
    );

    return this.findOne(contrato.id);
  }

  // ---- ACTUALIZAR (solo borrador) ----
  async update(id: string, dto: ActualizarContratoDto, usuario?: UsuarioAuth) {
    const existente = await this.prisma.contratoAlquiler.findUnique({
      where: { id },
    });
    if (!existente) throw new NotFoundException('Contrato no encontrado');
    if (existente.estado !== 'BORRADOR') {
      throw new BadRequestException(
        'Solo se puede editar un contrato en estado BORRADOR',
      );
    }

    const data: Prisma.ContratoAlquilerUpdateInput = {};
    if (dto.clienteNombre !== undefined) data.clienteNombre = dto.clienteNombre;
    if (dto.clienteEmpresa !== undefined)
      data.clienteEmpresa = dto.clienteEmpresa || null;
    if (dto.clienteDocumento !== undefined)
      data.clienteDocumento = dto.clienteDocumento || null;
    if (dto.clienteEmail !== undefined) data.clienteEmail = dto.clienteEmail;
    if (dto.clienteTelefono !== undefined)
      data.clienteTelefono = dto.clienteTelefono;
    if (dto.proyecto !== undefined) data.proyecto = dto.proyecto;
    if (dto.sede !== undefined) data.sede = dto.sede;
    if (dto.fechaInicio !== undefined)
      data.fechaInicio = new Date(dto.fechaInicio);
    if (dto.fechaFin !== undefined) data.fechaFin = new Date(dto.fechaFin);
    if (dto.condiciones !== undefined)
      data.condiciones = dto.condiciones || null;
    if (dto.observaciones !== undefined)
      data.observaciones = dto.observaciones || null;

    // Validar rango de fechas al actualizar (misma regla que en create)
    if (dto.fechaInicio !== undefined || dto.fechaFin !== undefined) {
      const inicio =
        dto.fechaInicio !== undefined
          ? new Date(dto.fechaInicio)
          : existente.fechaInicio;
      const fin =
        dto.fechaFin !== undefined
          ? new Date(dto.fechaFin)
          : existente.fechaFin;
      if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
        throw new BadRequestException('Fechas inválidas');
      }
      if (fin < inicio) {
        throw new BadRequestException(
          'La fecha de fin debe ser posterior a la de inicio',
        );
      }
    }

    await this.prisma.contratoAlquiler.update({ where: { id }, data });

    await this.auditoria.registrar(
      usuario,
      'ACTUALIZAR_CONTRATO',
      'ContratoAlquiler',
      id,
      { numero: existente.numero },
    );

    return this.findOne(id);
  }

  // ---- TRANSICIONES DE ESTADO (reserva → contrato → entrega → retorno) ----
  async cambiarEstado(
    id: string,
    dto: CambiarEstadoContratoDto,
    usuario?: UsuarioAuth,
  ) {
    const contrato = await this.obtenerContrato(id);
    const accion = dto.estado.toUpperCase();
    const motivo = dto.motivo;

    let nuevoEstado: EstadoContrato | null = null;
    let accionAuditoria = 'CAMBIAR_ESTADO_CONTRATO';
    let operacionesEquipos: {
      equipoId: string;
      estado: EstadoEquipo;
      disponible: boolean;
      tipoHistorial: 'CAMBIO_ESTADO' | 'ALQUILER';
      historial: string;
    }[] = [];

    switch (accion) {
      case 'CONFIRMAR': {
        if (contrato.estado !== 'BORRADOR') {
          throw new BadRequestException(
            'Solo se puede confirmar un contrato en BORRADOR',
          );
        }
        // Verificar disponibilidad de todos los equipos
        for (const item of contrato.items) {
          if (item.equipo.estado !== 'DISPONIBLE') {
            throw new BadRequestException(
              `El equipo ${item.equipo.codigoInterno || item.equipo.nombre} no está disponible (estado actual: ${item.equipo.estado})`,
            );
          }
        }
        operacionesEquipos = contrato.items.map((item) => ({
          equipoId: item.equipoId,
          estado: EstadoEquipo.RESERVADO,
          disponible: false,
          tipoHistorial: 'CAMBIO_ESTADO' as const,
          historial: `Reservado para el contrato ${contrato.numero} (${contrato.clienteNombre}).`,
        }));
        nuevoEstado = EstadoContrato.CONFIRMADO;
        accionAuditoria = 'CONFIRMAR_CONTRATO';
        break;
      }

      case 'INICIAR': {
        if (contrato.estado !== 'CONFIRMADO') {
          throw new BadRequestException(
            'Solo se puede iniciar un contrato CONFIRMADO',
          );
        }
        operacionesEquipos = contrato.items.map((item) => ({
          equipoId: item.equipoId,
          estado: EstadoEquipo.ALQUILADO,
          disponible: false,
          tipoHistorial: 'ALQUILER' as const,
          historial: `Equipo entregado en alquiler — contrato ${contrato.numero} (${contrato.clienteNombre}).`,
        }));
        nuevoEstado = EstadoContrato.EN_CURSO;
        accionAuditoria = 'INICIAR_CONTRATO';
        break;
      }

      case 'FINALIZAR': {
        if (contrato.estado !== 'EN_CURSO') {
          throw new BadRequestException(
            'Solo se puede finalizar un contrato EN_CURSO',
          );
        }
        operacionesEquipos = contrato.items.map((item) => ({
          equipoId: item.equipoId,
          estado: EstadoEquipo.DISPONIBLE,
          disponible: true,
          tipoHistorial: 'CAMBIO_ESTADO' as const,
          historial: `Retornado de alquiler — contrato ${contrato.numero} finalizado.`,
        }));
        nuevoEstado = EstadoContrato.FINALIZADO;
        accionAuditoria = 'FINALIZAR_CONTRATO';
        break;
      }

      case 'CANCELAR': {
        if (
          contrato.estado === 'FINALIZADO' ||
          contrato.estado === 'CANCELADO'
        ) {
          throw new BadRequestException(
            'No se puede cancelar un contrato ya finalizado o cancelado',
          );
        }
        // Liberar únicamente los equipos que estén reservados o alquilados
        // (si el contrato era BORRADOR, los equipos nunca fueron reservados)
        operacionesEquipos = contrato.items
          .filter(
            (item) =>
              item.equipo.estado === 'RESERVADO' ||
              item.equipo.estado === 'ALQUILADO',
          )
          .map((item) => ({
            equipoId: item.equipoId,
            estado: EstadoEquipo.DISPONIBLE,
            disponible: true,
            tipoHistorial: 'CAMBIO_ESTADO' as const,
            historial: `Liberado por cancelación del contrato ${contrato.numero}${motivo ? `: ${motivo}` : '.'}`,
          }));
        nuevoEstado = EstadoContrato.CANCELADO;
        accionAuditoria = 'CANCELAR_CONTRATO';
        break;
      }

      default:
        throw new BadRequestException(
          'Acción inválida. Use CONFIRMAR, INICIAR, FINALIZAR o CANCELAR',
        );
    }

    // Transacción atómica: equipos + historial + contrato en una sola operación
    await this.prisma.$transaction(async (tx) => {
      await Promise.all(
        operacionesEquipos.map((op) =>
          tx.equipo.update({
            where: { id: op.equipoId },
            data: { estado: op.estado, disponible: op.disponible },
          }),
        ),
      );
      await Promise.all(
        operacionesEquipos.map((op) =>
          tx.historialEquipo.create({
            data: {
              equipoId: op.equipoId,
              tipo: op.tipoHistorial,
              descripcion: op.historial,
              usuarioNombre: usuario?.nombre || 'Sistema',
            },
          }),
        ),
      );
      await tx.contratoAlquiler.update({
        where: { id },
        data: { estado: nuevoEstado },
      });
    });

    await this.auditoria.registrar(
      usuario,
      accionAuditoria,
      'ContratoAlquiler',
      id,
      {
        numero: contrato.numero,
        de: contrato.estado,
        a: nuevoEstado,
        motivo,
      },
    );

    return this.findOne(id);
  }

  // ---- INSPECCIONES / CHECK LISTS DIGITALES (ENTREGA y RETORNO) ----
  async registrarInspeccion(
    id: string,
    dto: RegistrarInspeccionDto,
    usuario?: UsuarioAuth,
  ) {
    const contrato = await this.obtenerContrato(id);

    const tipo = dto.tipo.toUpperCase();
    if (tipo !== 'ENTREGA' && tipo !== 'RETORNO') {
      throw new BadRequestException('Tipo de inspección inválido');
    }
    if (contrato.estado !== 'CONFIRMADO' && contrato.estado !== 'EN_CURSO') {
      throw new BadRequestException(
        'Las inspecciones solo se registran en contratos CONFIRMADOS o EN_CURSO',
      );
    }
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException(
        'El checklist debe incluir al menos un punto de inspección',
      );
    }

    const resultadosValidos = ['OK', 'NO_OK', 'NA'];
    const itemsData = dto.items.map((item) => {
      const resultado = item.resultado.toUpperCase();
      if (!resultadosValidos.includes(resultado)) {
        throw new BadRequestException(
          `Resultado inválido en "${item.descripcion}". Use OK, NO_OK o NA`,
        );
      }
      return {
        descripcion: item.descripcion,
        resultado: resultado as ResultadoChecklist,
        observacion: item.observacion || null,
      };
    });

    const inspeccion = await this.prisma.inspeccion.create({
      data: {
        contratoId: id,
        tipo: tipo,
        responsableNombre: dto.responsableNombre || usuario?.nombre || null,
        observaciones: dto.observaciones || null,
        items: { create: itemsData },
      },
      include: { items: true },
    });

    await this.auditoria.registrar(
      usuario,
      tipo === 'ENTREGA' ? 'REGISTRAR_ENTREGA' : 'REGISTRAR_RETORNO',
      'ContratoAlquiler',
      id,
      {
        numero: contrato.numero,
        puntos: dto.items.length,
        responsable: inspeccion.responsableNombre,
      },
    );

    return inspeccion;
  }

  // ---- ELIMINAR / CANCELAR (baja lógica) ----
  // Ningún contrato se borra físicamente: todos se conservan como CANCELADO
  // liberando sus equipos, para no perder el histórico operativo ni de
  // facturación. Los contratos ya cerrados (FINALIZADO/CANCELADO) no se tocan.
  async remove(id: string, usuario?: UsuarioAuth) {
    const contrato = await this.prisma.contratoAlquiler.findUnique({
      where: { id },
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');

    if (contrato.estado === 'FINALIZADO' || contrato.estado === 'CANCELADO') {
      return { ok: true, accion: 'SIN_CAMBIOS' };
    }

    await this.cambiarEstado(
      id,
      {
        estado: 'CANCELAR',
        motivo: 'Eliminado desde el listado de alquileres (baja lógica)',
      },
      usuario,
    );
    return { ok: true, accion: 'CANCELADO' };
  }
}
