import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsuarioAuth } from '../auth/auth.types';

@Injectable()
export class AuditoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async registrar(
    usuario: UsuarioAuth | undefined,
    accion: string,
    entidad: string,
    entidadId?: string,
    detalle?: unknown,
    ip?: string,
  ) {
    try {
      return await this.prisma.auditoriaLog.create({
        data: {
          usuarioId: usuario?.sub || null,
          email: usuario?.email || 'sistema',
          rol: usuario?.rol || 'SISTEMA',
          accion,
          entidad,
          entidadId,
          detalle: detalle ? JSON.stringify(detalle) : null,
          ip: ip || null,
        },
      });
    } catch (e) {
      // La auditoría nunca debe romper la operación principal
      console.error('Error registrando auditoría:', e);
      return null;
    }
  }

  async listar(filtros: { entidad?: string; email?: string; limite?: number }) {
    const where: Prisma.AuditoriaLogWhereInput = {};
    if (filtros.entidad) where.entidad = filtros.entidad;
    if (filtros.email) where.email = { contains: filtros.email };

    const limite = Math.min(filtros.limite || 100, 500);

    const [registros, total] = await this.prisma.$transaction([
      this.prisma.auditoriaLog.findMany({
        where,
        include: {
          usuario: { select: { nombre: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: limite,
      }),
      this.prisma.auditoriaLog.count({ where }),
    ]);

    return { registros, total };
  }

  async purgar(opcion: 'TODOS' | '30_DIAS' | '90_DIAS', usuario?: UsuarioAuth) {
    const where: Prisma.AuditoriaLogWhereInput = {};

    if (opcion === '30_DIAS') {
      const fechaCorte = new Date();
      fechaCorte.setDate(fechaCorte.getDate() - 30);
      where.createdAt = { lt: fechaCorte };
    } else if (opcion === '90_DIAS') {
      const fechaCorte = new Date();
      fechaCorte.setDate(fechaCorte.getDate() - 90);
      where.createdAt = { lt: fechaCorte };
    }

    const resultado = await this.prisma.auditoriaLog.deleteMany({ where });

    // Registrar la acción de purga en la auditoría
    await this.registrar(
      usuario,
      'PURGAR_AUDITORIA',
      'AuditoriaLog',
      undefined,
      { opcion, eliminados: resultado.count },
    );

    return { eliminados: resultado.count, mensaje: `Se purgaron ${resultado.count} registros de auditoría` };
  }
}
