import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { UsuarioAuth } from '../auth/auth.types';

@Injectable()
export class FamiliasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditoria: AuditoriaService,
  ) {}

  async findAll() {
    return this.prisma.familia.findMany({
      include: {
        subfamilias: { orderBy: { nombre: 'asc' } },
        _count: { select: { equipos: true } },
      },
      orderBy: { nombre: 'asc' },
    });
  }

  async findOne(id: string) {
    const familia = await this.prisma.familia.findUnique({
      where: { id },
      include: {
        subfamilias: { orderBy: { nombre: 'asc' } },
        equipos: {
          select: { id: true, codigoInterno: true, nombre: true, estado: true },
          orderBy: { codigoInterno: 'asc' },
        },
      },
    });
    if (!familia) throw new NotFoundException('Familia no encontrada');
    return familia;
  }

  async create(nombre: string, descripcion?: string, usuario?: UsuarioAuth) {
    const familia = await this.prisma.familia.create({
      data: { nombre, descripcion },
      include: { subfamilias: true },
    });
    await this.auditoria.registrar(
      usuario,
      'CREAR_FAMILIA',
      'Familia',
      familia.id,
      {
        nombre,
      },
    );
    return familia;
  }

  async crearSubfamilia(
    familiaId: string,
    nombre: string,
    usuario?: UsuarioAuth,
  ) {
    const familia = await this.prisma.familia.findUnique({
      where: { id: familiaId },
    });
    if (!familia) throw new NotFoundException('Familia no encontrada');

    const subfamilia = await this.prisma.subfamilia.create({
      data: { familiaId, nombre },
    });
    await this.auditoria.registrar(
      usuario,
      'CREAR_SUBFAMILIA',
      'Subfamilia',
      subfamilia.id,
      {
        familia: familia.nombre,
        nombre,
      },
    );
    return subfamilia;
  }
  async remove(id: string, usuario?: UsuarioAuth) {
    const familia = await this.prisma.familia.findUnique({
      where: { id },
      include: { _count: { select: { equipos: true } } },
    });
    if (!familia) throw new NotFoundException('Familia no encontrada');

    const totalEquipos = familia._count?.equipos ?? 0;
    if (totalEquipos > 0) {
      throw new BadRequestException(
        `No se puede eliminar la categoría "${familia.nombre}" porque tiene ${totalEquipos} equipo(s) asignado(s). Reasigna o elimina los equipos primero.`,
      );
    }

    // Eliminar subfamilias asociadas y la familia
    await this.prisma.subfamilia.deleteMany({ where: { familiaId: id } });
    await this.prisma.familia.delete({ where: { id } });

    await this.auditoria.registrar(
      usuario,
      'ELIMINAR_FAMILIA',
      'Familia',
      id,
      { nombre: familia.nombre },
    );
    return { status: 'OK', message: 'Familia eliminada' };
  }

  async removeSubfamilia(subId: string, usuario?: UsuarioAuth) {
    const subfamilia = await this.prisma.subfamilia.findUnique({
      where: { id: subId },
      include: {
        familia: true,
      },
    });
    if (!subfamilia) throw new NotFoundException('Subfamilia no encontrada');

    // Verificar si hay equipos usando esta subfamilia en la BD
    const equiposConSubfamilia = await this.prisma.equipo.count({
      where: { subfamiliaId: subId },
    });

    if (equiposConSubfamilia > 0) {
      throw new BadRequestException(
        `No se puede eliminar la subcategoría "${subfamilia.nombre}" porque tiene ${equiposConSubfamilia} equipo(s) asignado(s).`,
      );
    }

    await this.prisma.subfamilia.delete({ where: { id: subId } });

    await this.auditoria.registrar(
      usuario,
      'ELIMINAR_SUBFAMILIA',
      'Subfamilia',
      subId,
      { nombre: subfamilia.nombre },
    );
    return { status: 'OK', message: 'Subfamilia eliminada' };
  }
}
