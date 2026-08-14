import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { unlink } from 'fs/promises';
import sharp from 'sharp';
import {
  Prisma,
  TipoTransaccion,
  EstadoEquipo,
  TipoEvento,
  TipoDocumento,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { UsuarioAuth } from '../auth/auth.types';
import {
  AgregarHistorialDto,
  CambiarEstadoDto,
  CrearEquipoDto,
  ListarEquiposDto,
} from './dto/crear-equipo.dto';

@Injectable()
export class EquiposService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditoria: AuditoriaService,
  ) {}

  private async siguienteCodigo(): Promise<string> {
    const ultimo = await this.prisma.equipo.findFirst({
      where: { codigoInterno: { not: null } },
      orderBy: { codigoInterno: 'desc' },
      select: { codigoInterno: true },
    });

    const prefijo = 'HTR-MEG-';
    if (!ultimo?.codigoInterno) return `${prefijo}001`;

    const match = ultimo.codigoInterno.match(/(\d+)$/);
    const numero = match ? parseInt(match[1], 10) + 1 : 1;
    return `${prefijo}${String(numero).padStart(3, '0')}`;
  }

  // ---- PÚBLICO: catálogo (solo equipos disponibles, paginado) ----
  async findAllPublic(
    tipo?: string,
    busqueda?: string,
    destacado?: string,
    categoria?: string,
    page = 1,
    pageSize = 30,
  ) {
    const where: Prisma.EquipoWhereInput = {
      estado: 'DISPONIBLE',
    };

    if (destacado && (destacado === 'true' || destacado === '1')) {
      where.destacado = true;
    }

    if (tipo && tipo !== 'ALL' && tipo !== 'TODOS') {
      where.tipo = tipo.toUpperCase() as TipoTransaccion;
    }

    if (categoria && categoria !== 'TODAS' && categoria !== 'TODOS') {
      where.categoria = categoria;
    }

    if (busqueda && busqueda.trim()) {
      const q = busqueda.trim();
      where.OR = [
        { nombre: { contains: q } },
        { codigoInterno: { contains: q } },
        { marca: { contains: q } },
        { modelo: { contains: q } },
        { serie: { contains: q } },
        { categoria: { contains: q } },
        { descripcion: { contains: q } },
        { ubicacion: { contains: q } },
      ];
    }

    const pageActual = Math.max(1, Math.floor(Number(page) || 1));
    const tamPagina = Math.min(100, Math.max(1, Math.floor(Number(pageSize) || 30)));

    const [total, items] = await Promise.all([
      this.prisma.equipo.count({ where }),
      this.prisma.equipo.findMany({
        where,
        include: { familia: true, subfamilia: true },
        orderBy: { createdAt: 'desc' },
        skip: (pageActual - 1) * tamPagina,
        take: tamPagina,
      }),
    ]);

    return {
      items,
      total,
      page: pageActual,
      pageSize: tamPagina,
      totalPages: Math.max(1, Math.ceil(total / tamPagina)),
    };
  }

  // ---- PÚBLICO: categorías únicas para el filtro del catálogo ----
  async listarCategorias() {
    const categorias = await this.prisma.equipo.findMany({
      where: { estado: 'DISPONIBLE' },
      select: { categoria: true },
      distinct: ['categoria'],
      orderBy: { categoria: 'asc' },
    });
    return categorias.map((c) => c.categoria).filter(Boolean);
  }

  async findOnePublic(id: string) {
    const equipo = await this.prisma.equipo.findUnique({
      where: { id },
      include: {
        familia: true,
        subfamilia: true,
        documentos: true,
      },
    });
    if (!equipo) throw new NotFoundException('Equipo no encontrado');
    return equipo;
  }

  // ---- ADMIN: listado completo con filtros ----
  async findAllAdmin(filtros: ListarEquiposDto) {
    const where: Prisma.EquipoWhereInput = {};

    if (filtros.tipo && filtros.tipo !== 'TODOS' && filtros.tipo !== 'ALL') {
      where.tipo = filtros.tipo.toUpperCase() as TipoTransaccion;
    }
    if (
      filtros.estado &&
      filtros.estado !== 'TODOS' &&
      filtros.estado !== 'TODOS'
    ) {
      where.estado = filtros.estado as EstadoEquipo;
    }
    if (filtros.familiaId) {
      where.familiaId = filtros.familiaId;
    }
    if (filtros.ubicacion && filtros.ubicacion !== 'TODAS') {
      where.ubicacion = filtros.ubicacion;
    }
    if (filtros.busqueda) {
      where.OR = [
        { nombre: { contains: filtros.busqueda } },
        { codigoInterno: { contains: filtros.busqueda } },
        { marca: { contains: filtros.busqueda } },
        { modelo: { contains: filtros.busqueda } },
        { serie: { contains: filtros.busqueda } },
      ];
    }

    return this.prisma.equipo.findMany({
      where,
      include: { familia: true, subfamilia: true },
      orderBy: { codigoInterno: 'asc' },
    });
  }

  async findOneAdmin(id: string) {
    const equipo = await this.prisma.equipo.findUnique({
      where: { id },
      include: {
        familia: true,
        subfamilia: true,
        documentos: true,
        historial: { orderBy: { fecha: 'desc' } },
      },
    });
    if (!equipo) throw new NotFoundException('Equipo no encontrado');
    return equipo;
  }

  // ---- CREATE ----
  async create(dto: CrearEquipoDto, usuario?: UsuarioAuth) {
    const estado = (dto.estado || 'DISPONIBLE').toUpperCase();
    if (
      ![
        'DISPONIBLE',
        'RESERVADO',
        'ALQUILADO',
        'EN_MANTENIMIENTO',
        'EN_CALIBRACION',
        'FUERA_DE_SERVICIO',
        'EN_REPARACION',
        'DADO_DE_BAJA',
      ].includes(estado)
    ) {
      throw new BadRequestException('Estado de equipo inválido');
    }

    const codigoInterno = dto.codigoInterno || (await this.siguienteCodigo());

    const equipo = await this.prisma.equipo.create({
      data: {
        codigoInterno,
        nombre: dto.nombre,
        familiaId: dto.familiaId || null,
        subfamiliaId: dto.subfamiliaId || null,
        marca: dto.marca || null,
        modelo: dto.modelo || null,
        serie: dto.serie || null,
        anio: dto.anio || null,
        proveedor: dto.proveedor || null,
        costo: dto.costo != null ? new Prisma.Decimal(dto.costo) : null,
        valorComercial:
          dto.valorComercial != null
            ? new Prisma.Decimal(dto.valorComercial)
            : null,
        valorReposicion:
          dto.valorReposicion != null
            ? new Prisma.Decimal(dto.valorReposicion)
            : null,
        estado: estado as EstadoEquipo,
        ubicacion: dto.ubicacion,
        categoria: dto.categoria,
        descripcion: dto.descripcion,
        precio: dto.precio != null ? new Prisma.Decimal(dto.precio) : null,
        unidad: dto.unidad || null,
        tipo: dto.tipo.toUpperCase() as TipoTransaccion,
        imagenUrl: dto.imagenUrl,
        imagenThumbUrl: dto.imagenThumbUrl || null,
        disponible: estado === 'DISPONIBLE',
        destacado: dto.destacado ?? false,
        observaciones: dto.observaciones || null,
      },
    });

    await this.prisma.historialEquipo.create({
      data: {
        equipoId: equipo.id,
        tipo: 'COMPRA',
        descripcion: `Equipo registrado en el Maestro General con código ${codigoInterno}.`,
        usuarioNombre: usuario?.nombre || 'Sistema',
      },
    });

    await this.auditoria.registrar(
      usuario,
      'CREAR_EQUIPO',
      'Equipo',
      equipo.id,
      {
        codigo: codigoInterno,
        nombre: dto.nombre,
      },
    );

    return this.findOneAdmin(equipo.id);
  }

  // ---- UPDATE ----
  async update(id: string, dto: CrearEquipoDto, usuario?: UsuarioAuth) {
    const existente = await this.prisma.equipo.findUnique({ where: { id } });
    if (!existente) throw new NotFoundException('Equipo no encontrado');

    const estado = (dto.estado || existente.estado).toUpperCase();

    const equipo = await this.prisma.equipo.update({
      where: { id },
      data: {
        codigoInterno: dto.codigoInterno ?? existente.codigoInterno,
        nombre: dto.nombre ?? existente.nombre,
        familiaId:
          dto.familiaId !== undefined ? dto.familiaId : existente.familiaId,
        subfamiliaId:
          dto.subfamiliaId !== undefined
            ? dto.subfamiliaId
            : existente.subfamiliaId,
        marca: dto.marca !== undefined ? dto.marca : existente.marca,
        modelo: dto.modelo !== undefined ? dto.modelo : existente.modelo,
        serie: dto.serie !== undefined ? dto.serie : existente.serie,
        anio: dto.anio !== undefined ? dto.anio : existente.anio,
        proveedor:
          dto.proveedor !== undefined ? dto.proveedor : existente.proveedor,
        costo:
          dto.costo != null ? new Prisma.Decimal(dto.costo) : existente.costo,
        valorComercial:
          dto.valorComercial != null
            ? new Prisma.Decimal(dto.valorComercial)
            : existente.valorComercial,
        valorReposicion:
          dto.valorReposicion != null
            ? new Prisma.Decimal(dto.valorReposicion)
            : existente.valorReposicion,
        estado: estado as EstadoEquipo,
        ubicacion: dto.ubicacion ?? existente.ubicacion,
        categoria: dto.categoria ?? existente.categoria,
        descripcion: dto.descripcion ?? existente.descripcion,
        precio:
          dto.precio != null
            ? new Prisma.Decimal(dto.precio)
            : existente.precio,
        unidad: dto.unidad !== undefined ? dto.unidad : existente.unidad,
        tipo: dto.tipo
          ? (dto.tipo.toUpperCase() as TipoTransaccion)
          : existente.tipo,
        imagenUrl: dto.imagenUrl ?? existente.imagenUrl,
        imagenThumbUrl:
          dto.imagenThumbUrl !== undefined
            ? dto.imagenThumbUrl
            : existente.imagenThumbUrl,
        disponible: estado === 'DISPONIBLE',
        destacado:
          dto.destacado !== undefined ? dto.destacado : existente.destacado,
        observaciones:
          dto.observaciones !== undefined
            ? dto.observaciones
            : existente.observaciones,
      },
    });

    await this.auditoria.registrar(usuario, 'ACTUALIZAR_EQUIPO', 'Equipo', id, {
      codigo: equipo.codigoInterno,
      nombre: equipo.nombre,
    });

    // Limpieza: si se reemplazó la imagen, borrar los archivos locales viejos
    // para que no queden huérfanos en la carpeta uploads.
    if (
      dto.imagenUrl !== undefined &&
      dto.imagenUrl !== existente.imagenUrl
    ) {
      await this.eliminarArchivoLocal(existente.imagenUrl);
    }
    if (
      dto.imagenThumbUrl !== undefined &&
      dto.imagenThumbUrl !== existente.imagenThumbUrl
    ) {
      await this.eliminarArchivoLocal(existente.imagenThumbUrl);
    }

    return this.findOneAdmin(id);
  }

  // ---- ELIMINAR ARCHIVO LOCAL (solo rutas /uploads/, nunca URLs externas) ----
  private async eliminarArchivoLocal(url?: string | null) {
    if (!url || !url.startsWith('/uploads/')) return;
    const nombre = url.replace('/uploads/', '');
    const ruta = join(process.cwd(), 'uploads', nombre);
    await unlink(ruta).catch(() => undefined);
  }

  // ---- PROCESAR IMAGEN PRINCIPAL (estilo Mercado Libre: una foto maestra -> WebP + miniatura) ----
  async procesarImagen(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No se recibió ningún archivo');

    const dirUploads = join(process.cwd(), 'uploads');
    const base = `equipo-${randomUUID()}`;
    const rutaOriginal = file.path;

    // 1) Imagen WebP optimizada (máx. 1200px) para detalle / catálogo
    const nombreWebp = `${base}.webp`;
    await sharp(rutaOriginal)
      .rotate()
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(join(dirUploads, nombreWebp));

    // 2) Miniatura WebP (400px) para grillas y listados rápidos
    const nombreThumb = `${base}-thumb.webp`;
    await sharp(rutaOriginal)
      .rotate()
      .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(join(dirUploads, nombreThumb));

    // 3) Eliminar el archivo original subido (ya no se necesita)
    await unlink(rutaOriginal).catch(() => undefined);

    return {
      url: `/uploads/${nombreWebp}`,
      thumbUrl: `/uploads/${nombreThumb}`,
    };
  }

  // ---- CAMBIO DE ESTADO ----
  async cambiarEstado(
    id: string,
    dto: CambiarEstadoDto,
    usuario?: UsuarioAuth,
  ) {
    const existente = await this.prisma.equipo.findUnique({ where: { id } });
    if (!existente) throw new NotFoundException('Equipo no encontrado');

    const estado = dto.estado.toUpperCase();
    if (
      ![
        'DISPONIBLE',
        'RESERVADO',
        'ALQUILADO',
        'EN_MANTENIMIENTO',
        'EN_CALIBRACION',
        'FUERA_DE_SERVICIO',
        'EN_REPARACION',
        'DADO_DE_BAJA',
      ].includes(estado)
    ) {
      throw new BadRequestException('Estado de equipo inválido');
    }

    const equipo = await this.prisma.equipo.update({
      where: { id },
      data: {
        estado: estado as EstadoEquipo,
        disponible: estado === 'DISPONIBLE',
      },
    });

    await this.prisma.historialEquipo.create({
      data: {
        equipoId: id,
        tipo: 'CAMBIO_ESTADO',
        descripcion: `Estado cambiado de ${existente.estado} a ${estado}${dto.motivo ? `: ${dto.motivo}` : '.'}`,
        usuarioNombre: usuario?.nombre || 'Sistema',
      },
    });

    await this.auditoria.registrar(usuario, 'CAMBIO_ESTADO', 'Equipo', id, {
      codigo: equipo.codigoInterno,
      de: existente.estado,
      a: estado,
    });

    return this.findOneAdmin(id);
  }

  // ---- HISTORIAL ----
  async agregarHistorial(
    id: string,
    dto: AgregarHistorialDto,
    usuario?: UsuarioAuth,
  ) {
    const existente = await this.prisma.equipo.findUnique({ where: { id } });
    if (!existente) throw new NotFoundException('Equipo no encontrado');

    const evento = await this.prisma.historialEquipo.create({
      data: {
        equipoId: id,
        tipo: dto.tipo.toUpperCase() as TipoEvento,
        descripcion: dto.descripcion,
        fecha: dto.fecha ? new Date(dto.fecha) : new Date(),
        usuarioNombre: usuario?.nombre || 'Sistema',
      },
    });

    await this.auditoria.registrar(usuario, 'AGREGAR_HISTORIAL', 'Equipo', id, {
      tipo: dto.tipo,
    });

    return evento;
  }

  // ---- DOCUMENTOS ----
  async agregarDocumento(
    id: string,
    file: Express.Multer.File,
    tipo: string,
    usuario?: UsuarioAuth,
  ) {
    const existente = await this.prisma.equipo.findUnique({ where: { id } });
    if (!existente) throw new NotFoundException('Equipo no encontrado');

    const documento = await this.prisma.documentoEquipo.create({
      data: {
        equipoId: id,
        tipo: (tipo || 'OTRO').toUpperCase() as TipoDocumento,
        nombre: file.originalname,
        url: `/uploads/${file.filename}`,
        mimeType: file.mimetype,
        tamano: file.size,
      },
    });

    await this.auditoria.registrar(usuario, 'SUBIR_DOCUMENTO', 'Equipo', id, {
      archivo: file.originalname,
    });

    return documento;
  }

  async eliminarDocumento(
    equipoId: string,
    docId: string,
    usuario?: UsuarioAuth,
  ) {
    const documento = await this.prisma.documentoEquipo.findUnique({
      where: { id: docId },
    });
    if (!documento || documento.equipoId !== equipoId) {
      throw new NotFoundException('Documento no encontrado');
    }

    await this.prisma.documentoEquipo.delete({ where: { id: docId } });
    // Eliminar también el archivo del disco para que no quede huérfano
    await this.eliminarArchivoLocal(documento.url);
    await this.auditoria.registrar(
      usuario,
      'ELIMINAR_DOCUMENTO',
      'Equipo',
      equipoId,
      {
        archivo: documento.nombre,
      },
    );

    return { ok: true };
  }

  // ---- ELIMINAR (soft: dado de baja, "nada se elimina") ----
  async remove(id: string, usuario?: UsuarioAuth) {
    const existente = await this.prisma.equipo.findUnique({ where: { id } });
    if (!existente) throw new NotFoundException('Equipo no encontrado');

    const equipo = await this.prisma.equipo.update({
      where: { id },
      data: { estado: 'DADO_DE_BAJA', disponible: false },
    });

    await this.prisma.historialEquipo.create({
      data: {
        equipoId: id,
        tipo: 'CAMBIO_ESTADO',
        descripcion:
          'Equipo dado de baja (eliminación lógica, historial preservado).',
        usuarioNombre: usuario?.nombre || 'Sistema',
      },
    });

    await this.auditoria.registrar(usuario, 'DAR_DE_BAJA', 'Equipo', id, {
      codigo: existente.codigoInterno,
    });

    return { ok: true, estado: equipo.estado };
  }
}
