import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  EstadoEquipo,
  EstadoOrdenTrabajo,
  PrioridadOrden,
  TipoMantenimiento,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { UsuarioAuth } from '../auth/auth.types';
import {
  ActualizarOrdenTrabajoDto,
  CambiarEstadoOrdenDto,
  CrearOrdenTrabajoDto,
  CrearPlanMantenimientoDto,
  TareaMantenimientoDto,
} from './dto/mantenimiento.dto';

type OrdenPayload = Prisma.OrdenTrabajoGetPayload<{
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
        categoria: true;
      };
    };
    tareas: true;
  };
}>;

export interface OrdenConDetalle {
  id: string;
  numero: string;
  equipoId: string;
  tipo: string;
  prioridad: string;
  estado: string;
  descripcion: string;
  fechaProgramada: Date;
  fechaInicio: Date | null;
  fechaFin: Date | null;
  tecnicoResponsable: string | null;
  costoRepuestos: number | null;
  costoManoObra: number | null;
  costoTotal: number | null;
  observaciones: string | null;
  createdAt: Date;
  updatedAt: Date;
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
    categoria: string;
  };
  tareas: {
    id: string;
    descripcion: string;
    realizado: boolean;
    observacion: string | null;
  }[];
}

const TIPOS_VALIDOS = ['PREVENTIVO', 'CORRECTIVO', 'CALIBRACION', 'INSPECCION'];
const PRIORIDADES_VALIDAS = ['BAJA', 'MEDIA', 'ALTA', 'URGENTE'];

@Injectable()
export class MantenimientoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditoria: AuditoriaService,
  ) {}

  private async siguienteNumero(): Promise<string> {
    const ultimo = await this.prisma.ordenTrabajo.findFirst({
      orderBy: { numero: 'desc' },
      select: { numero: true },
    });

    const prefijo = 'HTR-OT-';
    if (!ultimo?.numero) return `${prefijo}001`;

    const match = ultimo.numero.match(/(\d+)$/);
    const numero = match ? parseInt(match[1], 10) + 1 : 1;
    return `${prefijo}${String(numero).padStart(3, '0')}`;
  }

  // Normaliza valores Decimal a number y calcula el costo total
  private mapearOrden(orden: OrdenPayload): OrdenConDetalle {
    const repuestos =
      orden.costoRepuestos != null ? Number(orden.costoRepuestos) : 0;
    const manoObra =
      orden.costoManoObra != null ? Number(orden.costoManoObra) : 0;
    return {
      id: orden.id,
      numero: orden.numero,
      equipoId: orden.equipoId,
      tipo: orden.tipo,
      prioridad: orden.prioridad,
      estado: orden.estado,
      descripcion: orden.descripcion,
      fechaProgramada: orden.fechaProgramada,
      fechaInicio: orden.fechaInicio,
      fechaFin: orden.fechaFin,
      tecnicoResponsable: orden.tecnicoResponsable,
      costoRepuestos: orden.costoRepuestos != null ? repuestos : null,
      costoManoObra: orden.costoManoObra != null ? manoObra : null,
      costoTotal: repuestos + manoObra,
      observaciones: orden.observaciones,
      createdAt: orden.createdAt,
      updatedAt: orden.updatedAt,
      equipo: orden.equipo,
      tareas: orden.tareas.map((t) => ({
        id: t.id,
        descripcion: t.descripcion,
        realizado: t.realizado,
        observacion: t.observacion,
      })),
    };
  }

  private async obtenerOrden(id: string) {
    const orden = await this.prisma.ordenTrabajo.findUnique({
      where: { id },
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
            categoria: true,
          },
        },
        tareas: { orderBy: { id: 'asc' } },
      },
    });
    if (!orden) throw new NotFoundException('Orden de trabajo no encontrada');
    return orden;
  }

  // ===================== ÓRDENES DE TRABAJO =====================

  async findAll() {
    const ordenes = await this.prisma.ordenTrabajo.findMany({
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
            categoria: true,
          },
        },
        tareas: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return ordenes.map((o) => this.mapearOrden(o));
  }

  async findOne(id: string) {
    const orden = await this.obtenerOrden(id);
    return this.mapearOrden(orden);
  }

  async findEquiposDisponibles() {
    const equipos = await this.prisma.equipo.findMany({
      where: {
        tipo: 'ALQUILER',
        estado: { in: ['DISPONIBLE', 'EN_MANTENIMIENTO', 'EN_CALIBRACION'] },
      },
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
        categoria: true,
        anio: true,
        tipo: true,
      },
      orderBy: { codigoInterno: 'asc' },
    });
    return equipos;
  }

  async create(dto: CrearOrdenTrabajoDto, usuario?: UsuarioAuth) {
    const equipo = await this.prisma.equipo.findUnique({
      where: { id: dto.equipoId },
    });
    if (!equipo) throw new NotFoundException('Equipo no encontrado');

    const tipo = dto.tipo.toUpperCase();
    if (!TIPOS_VALIDOS.includes(tipo)) {
      throw new BadRequestException('Tipo de mantenimiento inválido');
    }

    const prioridad = (dto.prioridad || 'MEDIA').toUpperCase();
    if (!PRIORIDADES_VALIDAS.includes(prioridad)) {
      throw new BadRequestException('Prioridad inválida');
    }

    const fechaProgramada = new Date(dto.fechaProgramada);
    if (isNaN(fechaProgramada.getTime())) {
      throw new BadRequestException('Fecha programada inválida');
    }

    const tareasData: TareaMantenimientoDto[] = dto.tareas || [];
    const numero = await this.siguienteNumero();

    const orden = await this.prisma.ordenTrabajo.create({
      data: {
        numero,
        equipoId: dto.equipoId,
        tipo: tipo as TipoMantenimiento,
        prioridad: prioridad as PrioridadOrden,
        descripcion: dto.descripcion,
        fechaProgramada,
        tecnicoResponsable: dto.tecnicoResponsable || null,
        observaciones: dto.observaciones || null,
        usuarioId: usuario?.sub || null,
        tareas: {
          create: tareasData.map((t) => ({
            descripcion: t.descripcion,
            realizado: t.realizado ?? false,
            observacion: t.observacion || null,
          })),
        },
      },
      include: { tareas: true },
    });

    await this.auditoria.registrar(
      usuario,
      'CREAR_ORDEN_TRABAJO',
      'OrdenTrabajo',
      orden.id,
      {
        numero,
        equipo: equipo.codigoInterno || equipo.nombre,
        tipo,
        prioridad,
      },
    );

    return this.findOne(orden.id);
  }

  async update(
    id: string,
    dto: ActualizarOrdenTrabajoDto,
    usuario?: UsuarioAuth,
  ) {
    const existente = await this.prisma.ordenTrabajo.findUnique({
      where: { id },
    });
    if (!existente)
      throw new NotFoundException('Orden de trabajo no encontrada');
    if (existente.estado === 'COMPLETADO' || existente.estado === 'CANCELADO') {
      throw new BadRequestException(
        'No se puede editar una orden COMPLETADA o CANCELADA',
      );
    }

    const data: Prisma.OrdenTrabajoUpdateInput = {};
    if (dto.tipo !== undefined) {
      const tipo = dto.tipo.toUpperCase();
      if (!TIPOS_VALIDOS.includes(tipo)) {
        throw new BadRequestException('Tipo de mantenimiento inválido');
      }
      data.tipo = tipo as TipoMantenimiento;
    }
    if (dto.prioridad !== undefined) {
      const prioridad = dto.prioridad.toUpperCase();
      if (!PRIORIDADES_VALIDAS.includes(prioridad)) {
        throw new BadRequestException('Prioridad inválida');
      }
      data.prioridad = prioridad as PrioridadOrden;
    }
    if (dto.descripcion !== undefined) data.descripcion = dto.descripcion;
    if (dto.fechaProgramada !== undefined) {
      const fecha = new Date(dto.fechaProgramada);
      if (isNaN(fecha.getTime())) {
        throw new BadRequestException('Fecha programada inválida');
      }
      data.fechaProgramada = fecha;
    }
    if (dto.tecnicoResponsable !== undefined)
      data.tecnicoResponsable = dto.tecnicoResponsable || null;
    if (dto.observaciones !== undefined)
      data.observaciones = dto.observaciones || null;

    if (dto.tareas !== undefined) {
      await this.prisma.tareaMantenimiento.deleteMany({
        where: { ordenTrabajoId: id },
      });
      data.tareas = {
        create: dto.tareas.map((t) => ({
          descripcion: t.descripcion,
          realizado: t.realizado ?? false,
          observacion: t.observacion || null,
        })),
      };
    }

    const actualizada = await this.prisma.ordenTrabajo.update({
      where: { id },
      data,
      include: { tareas: true },
    });
    await this.auditoria.registrar(
      usuario,
      'ACTUALIZAR_ORDEN_TRABAJO',
      'OrdenTrabajo',
      id,
      { numero: existente.numero },
    );

    return this.findOne(id);
  }

  // ---- TRANSICIONES: INICIAR → COMPLETAR / CANCELAR ----
  // Sincroniza el estado del equipo en una transacción atómica:
  //   INICIAR   → equipo a EN_MANTENIMIENTO (o EN_CALIBRACION si es CALIBRACION)
  //   COMPLETAR → equipo a DISPONIBLE (con historial y costos)
  //   CANCELAR  → equipo a DISPONIBLE (libera el equipo)
  async cambiarEstado(
    id: string,
    dto: CambiarEstadoOrdenDto,
    usuario?: UsuarioAuth,
  ) {
    const orden = await this.obtenerOrden(id);
    const accion = dto.estado.toUpperCase();

    let nuevoEstado: EstadoOrdenTrabajo | null = null;
    let estadoEquipo: EstadoEquipo | null = null;
    let accionAuditoria = 'CAMBIAR_ESTADO_ORDEN';
    let historial = '';

    switch (accion) {
      case 'INICIAR': {
        if (orden.estado !== 'PENDIENTE') {
          throw new BadRequestException(
            'Solo se puede iniciar una orden PENDIENTE',
          );
        }
        estadoEquipo =
          orden.tipo === 'CALIBRACION'
            ? EstadoEquipo.EN_CALIBRACION
            : EstadoEquipo.EN_MANTENIMIENTO;
        nuevoEstado = EstadoOrdenTrabajo.EN_PROGRESO;
        accionAuditoria = 'INICIAR_ORDEN_TRABAJO';
        historial = `Inicio de ${orden.tipo.toLowerCase()} — orden ${orden.numero}${orden.tecnicoResponsable ? ` (${orden.tecnicoResponsable})` : ''}.`;
        break;
      }

      case 'COMPLETAR': {
        if (orden.estado !== 'EN_PROGRESO') {
          throw new BadRequestException(
            'Solo se puede completar una orden EN_PROGRESO',
          );
        }
        estadoEquipo = EstadoEquipo.DISPONIBLE;
        nuevoEstado = EstadoOrdenTrabajo.COMPLETADO;
        accionAuditoria = 'COMPLETAR_ORDEN_TRABAJO';
        historial = `Mantenimiento ${orden.tipo.toLowerCase()} completado — orden ${orden.numero}.`;
        break;
      }

      case 'CANCELAR': {
        if (orden.estado === 'COMPLETADO' || orden.estado === 'CANCELADO') {
          throw new BadRequestException(
            'No se puede cancelar una orden ya completada o cancelada',
          );
        }
        // Liberar el equipo si estaba en mantenimiento por esta orden
        if (
          orden.equipo.estado === 'EN_MANTENIMIENTO' ||
          orden.equipo.estado === 'EN_CALIBRACION'
        ) {
          estadoEquipo = EstadoEquipo.DISPONIBLE;
        }
        nuevoEstado = EstadoOrdenTrabajo.CANCELADO;
        accionAuditoria = 'CANCELAR_ORDEN_TRABAJO';
        historial = `Orden ${orden.numero} cancelada${dto.observaciones ? `: ${dto.observaciones}` : '.'}`;
        break;
      }

      default:
        throw new BadRequestException(
          'Acción inválida. Use INICIAR, COMPLETAR o CANCELAR',
        );
    }

    const costoRepuestos =
      dto.costoRepuestos != null
        ? new Prisma.Decimal(dto.costoRepuestos)
        : null;
    const costoManoObra =
      dto.costoManoObra != null ? new Prisma.Decimal(dto.costoManoObra) : null;

    await this.prisma.$transaction(async (tx) => {
      if (estadoEquipo) {
        await tx.equipo.update({
          where: { id: orden.equipoId },
          data: {
            estado: estadoEquipo,
            disponible: estadoEquipo === 'DISPONIBLE',
          },
        });
        await tx.historialEquipo.create({
          data: {
            equipoId: orden.equipoId,
            tipo: 'MANTENIMIENTO',
            descripcion: historial,
            usuarioNombre: usuario?.nombre || 'Sistema',
          },
        });
      }

      await tx.ordenTrabajo.update({
        where: { id },
        data: {
          estado: nuevoEstado,
          ...(accion === 'INICIAR' ? { fechaInicio: new Date() } : {}),
          ...(accion === 'COMPLETAR' ? { fechaFin: new Date() } : {}),
          ...(costoRepuestos ? { costoRepuestos } : {}),
          ...(costoManoObra ? { costoManoObra } : {}),
          ...(dto.observaciones !== undefined
            ? { observaciones: dto.observaciones }
            : {}),
        },
      });
    });

    await this.auditoria.registrar(
      usuario,
      accionAuditoria,
      'OrdenTrabajo',
      id,
      {
        numero: orden.numero,
        de: orden.estado,
        a: nuevoEstado,
        costos:
          dto.costoRepuestos || dto.costoManoObra
            ? { repuestos: dto.costoRepuestos, manoObra: dto.costoManoObra }
            : undefined,
      },
    );

    return this.findOne(id);
  }

  // ---- TAREAS DE LA ORDEN (checklist interno) ----
  async actualizarTareas(
    id: string,
    tareas: TareaMantenimientoDto[],
    usuario?: UsuarioAuth,
  ) {
    const orden = await this.prisma.ordenTrabajo.findUnique({ where: { id } });
    if (!orden) throw new NotFoundException('Orden de trabajo no encontrada');
    if (orden.estado === 'COMPLETADO' || orden.estado === 'CANCELADO') {
      throw new BadRequestException(
        'No se pueden modificar tareas de una orden completada o cancelada',
      );
    }

    // Actualización simple: se marcan/crean tareas por descripción
    const existentes = await this.prisma.tareaMantenimiento.findMany({
      where: { ordenTrabajoId: id },
    });

    await this.prisma.$transaction(async (tx) => {
      // Actualizar las existentes
      for (const tarea of existentes) {
        const incoming = tareas.find(
          (t) => t.descripcion === tarea.descripcion,
        );
        await tx.tareaMantenimiento.update({
          where: { id: tarea.id },
          data: {
            realizado: incoming
              ? (incoming.realizado ?? tarea.realizado)
              : tarea.realizado,
            observacion:
              incoming && incoming.observacion !== undefined
                ? incoming.observacion || null
                : tarea.observacion,
          },
        });
      }
      // Crear las nuevas (que no existían)
      for (const tarea of tareas) {
        const yaExiste = existentes.some(
          (t) => t.descripcion === tarea.descripcion,
        );
        if (!yaExiste) {
          await tx.tareaMantenimiento.create({
            data: {
              ordenTrabajoId: id,
              descripcion: tarea.descripcion,
              realizado: tarea.realizado ?? false,
              observacion: tarea.observacion || null,
            },
          });
        }
      }
    });

    await this.auditoria.registrar(
      usuario,
      'ACTUALIZAR_TAREAS_ORDEN',
      'OrdenTrabajo',
      id,
      { numero: orden.numero, tareas: tareas.length },
    );

    return this.findOne(id);
  }

  // ---- ELIMINAR (solo pendiente, sin rastro en el equipo) ----
  async remove(id: string, usuario?: UsuarioAuth) {
    const orden = await this.prisma.ordenTrabajo.findUnique({ where: { id } });
    if (!orden) throw new NotFoundException('Orden de trabajo no encontrada');
    if (orden.estado !== 'PENDIENTE') {
      throw new BadRequestException(
        'Solo se puede eliminar una orden en estado PENDIENTE',
      );
    }

    await this.prisma.ordenTrabajo.delete({ where: { id } });
    await this.auditoria.registrar(
      usuario,
      'ELIMINAR_ORDEN_TRABAJO',
      'OrdenTrabajo',
      id,
      { numero: orden.numero },
    );

    return { ok: true };
  }

  // ===================== PLAN DE MANTENIMIENTO =====================

  async listarPlanes() {
    const planes = await this.prisma.planMantenimiento.findMany({
      include: {
        equipo: {
          select: {
            id: true,
            codigoInterno: true,
            nombre: true,
            marca: true,
            modelo: true,
            imagenUrl: true,
            estado: true,
          },
        },
      },
      orderBy: { proximaFecha: 'asc' },
    });
    return planes;
  }

  async crearPlan(dto: CrearPlanMantenimientoDto, usuario?: UsuarioAuth) {
    const equipo = await this.prisma.equipo.findUnique({
      where: { id: dto.equipoId },
    });
    if (!equipo) throw new NotFoundException('Equipo no encontrado');

    const frecuenciaValida = ['MENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL'];
    const frecuencia = dto.frecuencia.toUpperCase();
    if (!frecuenciaValida.includes(frecuencia)) {
      throw new BadRequestException('Frecuencia inválida');
    }

    const proximaFecha = new Date(dto.proximaFecha);
    if (isNaN(proximaFecha.getTime())) {
      throw new BadRequestException('Fecha inválida');
    }

    const plan = await this.prisma.planMantenimiento.create({
      data: {
        equipoId: dto.equipoId,
        frecuencia,
        descripcion: dto.descripcion,
        proximaFecha,
      },
      include: {
        equipo: {
          select: {
            id: true,
            codigoInterno: true,
            nombre: true,
            imagenUrl: true,
            estado: true,
          },
        },
      },
    });

    await this.auditoria.registrar(
      usuario,
      'CREAR_PLAN_MANTENIMIENTO',
      'PlanMantenimiento',
      plan.id,
      {
        equipo: equipo.codigoInterno || equipo.nombre,
        frecuencia,
      },
    );

    return plan;
  }

  async eliminarPlan(id: string, usuario?: UsuarioAuth) {
    const plan = await this.prisma.planMantenimiento.findUnique({
      where: { id },
    });
    if (!plan)
      throw new NotFoundException('Plan de mantenimiento no encontrado');

    await this.prisma.planMantenimiento.delete({ where: { id } });
    await this.auditoria.registrar(
      usuario,
      'ELIMINAR_PLAN_MANTENIMIENTO',
      'PlanMantenimiento',
      id,
      { frecuencia: plan.frecuencia },
    );

    return { ok: true };
  }
}
