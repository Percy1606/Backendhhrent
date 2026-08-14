import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EstadoContrato, Prisma } from '@prisma/client';

const ESTADOS_CON_INGRESO: EstadoContrato[] = [
  'CONFIRMADO',
  'EN_CURSO',
  'FINALIZADO',
];

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  private redondear(n: number, decimales = 1): number {
    const f = Math.pow(10, decimales);
    return Math.round(n * f) / f;
  }

  async resumen(desdeStr?: string, hastaStr?: string) {
    // ---- Período de análisis (opcional) ----
    let fechaDesde: Date | undefined;
    let fechaHasta: Date | undefined;
    if (desdeStr) {
      fechaDesde = new Date(desdeStr);
      if (isNaN(fechaDesde.getTime())) {
        throw new BadRequestException('Parámetro "desde" inválido');
      }
    }
    if (hastaStr) {
      fechaHasta = new Date(hastaStr);
      if (isNaN(fechaHasta.getTime())) {
        throw new BadRequestException('Parámetro "hasta" inválido');
      }
      // Las fechas llegan como YYYY-MM-DD (medianoche UTC); extender al fin del
      // día para incluir los contratos de todo el último día del período.
      fechaHasta.setUTCHours(23, 59, 59, 999);
    }
    if (fechaDesde && fechaHasta && fechaDesde > fechaHasta) {
      throw new BadRequestException(
        'La fecha "desde" no puede ser posterior a "hasta"',
      );
    }

    // Filtro de contratos por fecha de inicio dentro del período
    const filtroFechas: Prisma.DateTimeFilter = {};
    if (fechaDesde) filtroFechas.gte = fechaDesde;
    if (fechaHasta) filtroFechas.lte = fechaHasta;
    const whereContratos: Prisma.ContratoAlquilerWhereInput = {};
    if (fechaDesde || fechaHasta) whereContratos.fechaInicio = filtroFechas;

    const [equipos, contratos, ordenes, cotizaciones] = await Promise.all([
      this.prisma.equipo.findMany({
        select: {
          id: true,
          nombre: true,
          codigoInterno: true,
          estado: true,
          costo: true,
          valorComercial: true,
          valorReposicion: true,
        },
      }),
      this.prisma.contratoAlquiler.findMany({
        where: whereContratos,
        select: {
          id: true,
          numero: true,
          clienteNombre: true,
          clienteEmpresa: true,
          proyecto: true,
          estado: true,
          fechaInicio: true,
          fechaFin: true,
          total: true,
          subtotal: true,
          items: { select: { equipoId: true, cantidad: true, subtotal: true } },
        },
      }),
      this.prisma.ordenTrabajo.findMany({
        select: {
          id: true,
          estado: true,
          costoRepuestos: true,
          costoManoObra: true,
        },
      }),
      this.prisma.cotizacion.findMany({
        select: { id: true, estado: true, totalEstimado: true },
      }),
    ]);

    // ---------- FLOTA ----------
    const activos = equipos.filter((e) => e.estado !== 'DADO_DE_BAJA');
    const contar = (estados: string[]) =>
      activos.filter((e) => estados.includes(e.estado)).length;

    const disponibles = contar(['DISPONIBLE']);
    const alquilados = contar(['ALQUILADO']);
    const reservados = contar(['RESERVADO']);
    const enMantenimiento = contar([
      'EN_MANTENIMIENTO',
      'EN_CALIBRACION',
      'EN_REPARACION',
    ]);
    const fueraServicio = contar(['FUERA_DE_SERVICIO']);
    const dadosDeBaja = equipos.length - activos.length;

    const valorInventario = activos.reduce(
      (acc, e) => acc + Number(e.valorComercial ?? 0),
      0,
    );
    const valorReposicion = activos.reduce(
      (acc, e) => acc + Number(e.valorReposicion ?? 0),
      0,
    );

    const utilizacionActual =
      activos.length > 0
        ? this.redondear(((alquilados + reservados) / activos.length) * 100)
        : 0;

    // ---------- INGRESOS ----------
    const ingresosPorEstado: Record<string, number> = {
      facturado: 0,
      enCurso: 0,
      proyectado: 0,
      cancelado: 0,
    };
    for (const c of contratos) {
      const total = Number(c.total ?? 0);
      if (c.estado === 'FINALIZADO') ingresosPorEstado.facturado += total;
      else if (c.estado === 'EN_CURSO') ingresosPorEstado.enCurso += total;
      else if (c.estado === 'CONFIRMADO') ingresosPorEstado.proyectado += total;
      else if (c.estado === 'CANCELADO') ingresosPorEstado.cancelado += total;
    }

    // ---------- UTILIZACIÓN HISTÓRICA (días-equipo en la ventana del período) ----------
    // Nota: los KPIs de ingresos y utilización atribuyen los contratos por su
    // fecha de inicio; un contrato que comenzó antes del período pero estuvo
    // activo dentro de él no se cuenta en esta ventana.
    const hoy = new Date();
    const hace90 = new Date();
    hace90.setDate(hace90.getDate() - 90);
    const inicioVentana =
      fechaDesde ??
      (fechaHasta ? new Date(fechaHasta.getTime() - 90 * 86400000) : hace90);
    const finVentana = fechaHasta ?? hoy;
    const diasVentana = Math.max(
      1,
      Math.round((finVentana.getTime() - inicioVentana.getTime()) / 86400000),
    );

    let diasEquipoAlquilados = 0;
    for (const c of contratos) {
      if (!ESTADOS_CON_INGRESO.includes(c.estado)) continue;
      const inicio = new Date(c.fechaInicio);
      const fin = new Date(c.fechaFin);
      const desde = inicio > inicioVentana ? inicio : inicioVentana;
      const hasta = fin < finVentana ? fin : finVentana;
      const dias = Math.max(0, (hasta.getTime() - desde.getTime()) / 86400000);
      const cantidad = c.items.reduce((acc, i) => acc + i.cantidad, 0);
      diasEquipoAlquilados += dias * cantidad;
    }
    const capacidadTotal = activos.length * diasVentana;
    const utilizacion90 =
      capacidadTotal > 0
        ? this.redondear((diasEquipoAlquilados / capacidadTotal) * 100)
        : 0;

    // ---------- TIEMPO MUERTO (equipos nunca alquilados) ----------
    const equiposAlquilados = new Set(
      contratos
        .filter((c) => ESTADOS_CON_INGRESO.includes(c.estado))
        .flatMap((c) => c.items.map((i) => i.equipoId)),
    );
    const sinRotacion = activos.filter(
      (e) => !equiposAlquilados.has(e.id),
    ).length;

    // ---------- EQUIPOS MÁS RENTABLES (top 5) ----------
    const ingresoRealPorEquipo = new Map<string, number>();
    for (const c of contratos) {
      if (!ESTADOS_CON_INGRESO.includes(c.estado)) continue;
      for (const item of c.items) {
        ingresoRealPorEquipo.set(
          item.equipoId,
          (ingresoRealPorEquipo.get(item.equipoId) ?? 0) +
            Number(item.subtotal ?? 0),
        );
      }
    }

    const equiposMasRentables = activos
      .map((e) => {
        const ingreso = ingresoRealPorEquipo.get(e.id) ?? 0;
        const costo = Number(e.costo ?? e.valorComercial ?? 0);
        return {
          id: e.id,
          codigoInterno: e.codigoInterno,
          nombre: e.nombre,
          ingreso: this.redondear(ingreso, 2),
          costo: this.redondear(costo, 2),
          roi:
            costo > 0
              ? this.redondear(((ingreso - costo) / costo) * 100)
              : null,
        };
      })
      .filter((e) => e.ingreso > 0)
      .sort((a, b) => b.ingreso - a.ingreso)
      .slice(0, 5);

    // ---------- TOP CLIENTES (top 5) ----------
    const porCliente = new Map<
      string,
      {
        cliente: string;
        empresa: string | null;
        ingreso: number;
        contratos: number;
      }
    >();
    for (const c of contratos) {
      if (!ESTADOS_CON_INGRESO.includes(c.estado)) continue;
      const key = `${c.clienteNombre}|${c.clienteEmpresa ?? ''}`;
      const actual = porCliente.get(key) ?? {
        cliente: c.clienteNombre,
        empresa: c.clienteEmpresa,
        ingreso: 0,
        contratos: 0,
      };
      actual.ingreso += Number(c.total ?? 0);
      actual.contratos += 1;
      porCliente.set(key, actual);
    }
    const topClientes = [...porCliente.values()]
      .sort((a, b) => b.ingreso - a.ingreso)
      .slice(0, 5)
      .map((c) => ({
        ...c,
        ingreso: this.redondear(c.ingreso, 2),
      }));

    // ---------- INGRESOS POR MES (meses del período o últimos 6) ----------
    const anioMes = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    let meses: { clave: string; etiqueta: string }[];
    if (fechaDesde && fechaHasta) {
      // Buckets mensuales entre desde y hasta (máx. 24 para legibilidad)
      const inicio = new Date(
        fechaDesde.getFullYear(),
        fechaDesde.getMonth(),
        1,
      );
      const fin = new Date(fechaHasta.getFullYear(), fechaHasta.getMonth(), 1);
      const totalMeses =
        (fin.getFullYear() - inicio.getFullYear()) * 12 +
        (fin.getMonth() - inicio.getMonth()) +
        1;
      const cursor = new Date(
        inicio.getFullYear(),
        inicio.getMonth() + Math.max(0, totalMeses - 24),
        1,
      );
      meses = [];
      while (cursor <= fin) {
        meses.push({
          clave: anioMes(cursor),
          etiqueta: cursor.toLocaleDateString('es-PE', { month: 'short' }),
        });
        cursor.setMonth(cursor.getMonth() + 1);
      }
    } else {
      const ref = fechaHasta ?? hoy;
      meses = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(ref.getFullYear(), ref.getMonth() - (5 - i), 1);
        return {
          clave: anioMes(d),
          etiqueta: d.toLocaleDateString('es-PE', { month: 'short' }),
        };
      });
    }
    const ingresoPorMes = new Map<string, number>();
    for (const c of contratos) {
      if (!ESTADOS_CON_INGRESO.includes(c.estado)) continue;
      const d = new Date(c.fechaInicio);
      const clave = anioMes(d);
      ingresoPorMes.set(
        clave,
        (ingresoPorMes.get(clave) ?? 0) + Number(c.total ?? 0),
      );
    }
    const ingresosPorMes = meses.map((m) => ({
      mes: m.clave,
      etiqueta: m.etiqueta,
      ingreso: this.redondear(ingresoPorMes.get(m.clave) ?? 0, 2),
    }));

    // ---------- CONTRATOS POR ESTADO ----------
    const contratosPorEstado = (
      ['BORRADOR', 'CONFIRMADO', 'EN_CURSO', 'FINALIZADO', 'CANCELADO'] as const
    ).map((estado) => ({
      estado,
      cantidad: contratos.filter((c) => c.estado === estado).length,
    }));

    // ---------- MANTENIMIENTO ----------
    const mantenimiento = {
      pendientes: ordenes.filter((o) => o.estado === 'PENDIENTE').length,
      enProgreso: ordenes.filter((o) => o.estado === 'EN_PROGRESO').length,
      completadas: ordenes.filter((o) => o.estado === 'COMPLETADO').length,
      canceladas: ordenes.filter((o) => o.estado === 'CANCELADO').length,
      costoTotal: this.redondear(
        ordenes
          .filter((o) => o.estado === 'COMPLETADO')
          .reduce(
            (acc, o) =>
              acc +
              Number(o.costoRepuestos ?? 0) +
              Number(o.costoManoObra ?? 0),
            0,
          ),
        2,
      ),
    };

    // ---------- COTIZACIONES ----------
    const pendientes = cotizaciones.filter((c) => c.estado === 'PENDIENTE');
    const cotizacionesResumen = {
      pendientes: pendientes.length,
      totalEstimado: this.redondear(
        pendientes.reduce((acc, c) => acc + Number(c.totalEstimado ?? 0), 0),
        2,
      ),
    };

    // ---------- ALQUILERES ACTIVOS ----------
    const alquileresActivos = contratos
      .filter((c) => c.estado === 'EN_CURSO')
      .map((c) => ({
        id: c.id,
        numero: c.numero,
        clienteNombre: c.clienteNombre,
        clienteEmpresa: c.clienteEmpresa,
        proyecto: c.proyecto,
        fechaInicio: c.fechaInicio,
        fechaFin: c.fechaFin,
        total: Number(c.total ?? 0),
        equipos: c.items.reduce((acc, i) => acc + i.cantidad, 0),
      }))
      .sort((a, b) => b.fechaFin.getTime() - a.fechaFin.getTime());

    return {
      generadoEn: hoy.toISOString(),
      periodo: {
        desde: fechaDesde ? fechaDesde.toISOString() : null,
        hasta: fechaHasta ? fechaHasta.toISOString() : null,
      },

      flota: {
        total: equipos.length,
        activos: activos.length,
        disponibles,
        alquilados,
        reservados,
        enMantenimiento,
        fueraServicio,
        dadosDeBaja,
        utilizacionActual,
        sinRotacion,
        valorInventario: this.redondear(valorInventario, 2),
        valorReposicion: this.redondear(valorReposicion, 2),
      },
      ingresos: {
        facturado: this.redondear(ingresosPorEstado.facturado, 2),
        enCurso: this.redondear(ingresosPorEstado.enCurso, 2),
        proyectado: this.redondear(ingresosPorEstado.proyectado, 2),
        cancelado: this.redondear(ingresosPorEstado.cancelado, 2),
      },
      utilizacion90,
      equiposMasRentables,
      topClientes,
      ingresosPorMes,
      contratosPorEstado,
      mantenimiento,
      cotizaciones: cotizacionesResumen,
      alquileresActivos,
    };
  }
}
