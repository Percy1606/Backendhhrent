import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AlquileresService } from './alquileres.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import type { RequestConUsuario } from '../auth/auth.types';
import {
  ActualizarContratoDto,
  CambiarEstadoContratoDto,
  CrearContratoDto,
  RegistrarInspeccionDto,
} from './dto/alquileres.dto';

const ROLES_LECTURA = [
  'ADMINISTRADOR',
  'GERENCIA',
  'COMERCIAL',
  'LOGISTICA',
  'OPERACIONES',
  'CONTABILIDAD',
  'ALMACEN',
  'CONSULTA',
];

const ROLES_EDITORES = [
  'ADMINISTRADOR',
  'GERENCIA',
  'COMERCIAL',
  'LOGISTICA',
  'OPERACIONES',
  'ALMACEN',
];

@Controller('alquileres')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AlquileresController {
  constructor(private readonly alquileresService: AlquileresService) {}

  @Get()
  @Roles(...ROLES_LECTURA)
  findAll() {
    return this.alquileresService.findAll();
  }

  @Get(':id')
  @Roles(...ROLES_LECTURA)
  findOne(@Param('id') id: string) {
    return this.alquileresService.findOne(id);
  }

  @Post()
  @Roles(...ROLES_EDITORES)
  create(@Body() dto: CrearContratoDto, @Req() req: RequestConUsuario) {
    return this.alquileresService.create(dto, req.user);
  }

  @Patch(':id')
  @Roles(...ROLES_EDITORES)
  update(
    @Param('id') id: string,
    @Body() dto: ActualizarContratoDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.alquileresService.update(id, dto, req.user);
  }

  @Patch(':id/estado')
  @Roles(...ROLES_EDITORES)
  cambiarEstado(
    @Param('id') id: string,
    @Body() dto: CambiarEstadoContratoDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.alquileresService.cambiarEstado(id, dto, req.user);
  }

  @Post(':id/inspecciones')
  @Roles(...ROLES_EDITORES)
  registrarInspeccion(
    @Param('id') id: string,
    @Body() dto: RegistrarInspeccionDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.alquileresService.registrarInspeccion(id, dto, req.user);
  }

  @Delete(':id')
  @Roles(...ROLES_EDITORES)
  remove(@Param('id') id: string, @Req() req: RequestConUsuario) {
    return this.alquileresService.remove(id, req.user);
  }
}
