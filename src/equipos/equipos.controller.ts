import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { EquiposService } from './equipos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import type { RequestConUsuario } from '../auth/auth.types';
import {
  AgregarHistorialDto,
  CambiarEstadoDto,
  CrearEquipoDto,
  ListarEquiposDto,
} from './dto/crear-equipo.dto';

const ROLES_EDITORES = ['ADMINISTRADOR', 'GERENCIA', 'ALMACEN', 'OPERACIONES'];

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  // ===== RUTAS PÚBLICAS (catálogo web) =====
  @Get()
  findAllPublic(
    @Query('tipo') tipo?: string,
    @Query('busqueda') busqueda?: string,
    @Query('destacado') destacado?: string,
    @Query('categoria') categoria?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.equiposService.findAllPublic(
      tipo,
      busqueda,
      destacado,
      categoria,
      page ? Number(page) : undefined,
      pageSize ? Number(pageSize) : undefined,
    );
  }

  // Debe ir ANTES de @Get(':id') para que 'categorias' no se tome como id
  @Get('categorias')
  listarCategorias() {
    return this.equiposService.listarCategorias();
  }

  @Get(':id')
  findOnePublic(@Param('id') id: string) {
    return this.equiposService.findOnePublic(id);
  }

  // ===== RUTAS ADMIN (panel de gestión) =====
  @Get('admin/listar')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    'ADMINISTRADOR',
    'GERENCIA',
    'COMERCIAL',
    'LOGISTICA',
    'OPERACIONES',
    'CONTABILIDAD',
    'ALMACEN',
    'CONSULTA',
  )
  findAllAdmin(@Query() filtros: ListarEquiposDto) {
    return this.equiposService.findAllAdmin(filtros);
  }

  @Get('admin/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    'ADMINISTRADOR',
    'GERENCIA',
    'COMERCIAL',
    'LOGISTICA',
    'OPERACIONES',
    'CONTABILIDAD',
    'ALMACEN',
    'CONSULTA',
  )
  findOneAdmin(@Param('id') id: string) {
    return this.equiposService.findOneAdmin(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...ROLES_EDITORES)
  create(@Body() dto: CrearEquipoDto, @Req() req: RequestConUsuario) {
    return this.equiposService.create(dto, req.user);
  }

  // Subida de la imagen principal del producto (estilo Mercado Libre: se sube la foto
  // maestra, el backend genera WebP + miniatura y devuelve las URLs para guardar).
  @Post('imagen')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...ROLES_EDITORES)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          cb(null, `tmp-${randomUUID()}${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const permitidos = ['image/jpeg', 'image/png', 'image/webp'];
        if (!permitidos.includes(file.mimetype)) {
          return cb(
            new BadRequestException(
              'Formato no permitido. Sube JPG, PNG o WebP (máx. 10 MB).',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  subirImagen(@UploadedFile() file: Express.Multer.File) {
    return this.equiposService.procesarImagen(file);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...ROLES_EDITORES)
  update(
    @Param('id') id: string,
    @Body() dto: CrearEquipoDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.equiposService.update(id, dto, req.user);
  }

  @Patch(':id/estado')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...ROLES_EDITORES)
  cambiarEstado(
    @Param('id') id: string,
    @Body() dto: CambiarEstadoDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.equiposService.cambiarEstado(id, dto, req.user);
  }

  @Post(':id/historial')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...ROLES_EDITORES)
  agregarHistorial(
    @Param('id') id: string,
    @Body() dto: AgregarHistorialDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.equiposService.agregarHistorial(id, dto, req.user);
  }

  @Post(':id/documentos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...ROLES_EDITORES)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          cb(null, `${randomUUID()}${ext}`);
        },
      }),
    }),
  )
  agregarDocumento(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Query('tipo') tipo: string,
    @Req() req: RequestConUsuario,
  ) {
    if (!file) {
      return { error: 'No se recibió ningún archivo' };
    }
    return this.equiposService.agregarDocumento(id, file, tipo, req.user);
  }

  @Delete(':id/documentos/:docId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...ROLES_EDITORES)
  eliminarDocumento(
    @Param('id') id: string,
    @Param('docId') docId: string,
    @Req() req: RequestConUsuario,
  ) {
    return this.equiposService.eliminarDocumento(id, docId, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...ROLES_EDITORES)
  remove(@Param('id') id: string, @Req() req: RequestConUsuario) {
    return this.equiposService.remove(id, req.user);
  }
}
