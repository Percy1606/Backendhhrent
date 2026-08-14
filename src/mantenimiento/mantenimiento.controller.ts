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
import { MantenimientoService } from './mantenimiento.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import type { RequestConUsuario } from '../auth/auth.types';
import {
  ActualizarOrdenTrabajoDto,
  ActualizarTareasDto,
  CambiarEstadoOrdenDto,
  CrearOrdenTrabajoDto,
  CrearPlanMantenimientoDto,
} from './dto/mantenimiento.dto';

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
  'LOGISTICA',
  'OPERACIONES',
  'ALMACEN',
];

@Controller('mantenimiento')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MantenimientoController {
  constructor(private readonly mantenimientoService: MantenimientoService) {}

  // ===== ÓRDENES DE TRABAJO =====
  @Get('ordenes')
  @Roles(...ROLES_LECTURA)
  findAll() {
    return this.mantenimientoService.findAll();
  }

  @Get('ordenes/equipos')
  @Roles(...ROLES_LECTURA)
  findEquiposDisponibles() {
    return this.mantenimientoService.findEquiposDisponibles();
  }

  @Get('ordenes/:id')
  @Roles(...ROLES_LECTURA)
  findOne(@Param('id') id: string) {
    return this.mantenimientoService.findOne(id);
  }

  @Post('ordenes')
  @Roles(...ROLES_EDITORES)
  create(@Body() dto: CrearOrdenTrabajoDto, @Req() req: RequestConUsuario) {
    return this.mantenimientoService.create(dto, req.user);
  }

  @Patch('ordenes/:id')
  @Roles(...ROLES_EDITORES)
  update(
    @Param('id') id: string,
    @Body() dto: ActualizarOrdenTrabajoDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.mantenimientoService.update(id, dto, req.user);
  }

  @Patch('ordenes/:id/estado')
  @Roles(...ROLES_EDITORES)
  cambiarEstado(
    @Param('id') id: string,
    @Body() dto: CambiarEstadoOrdenDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.mantenimientoService.cambiarEstado(id, dto, req.user);
  }

  @Patch('ordenes/:id/tareas')
  @Roles(...ROLES_EDITORES)
  actualizarTareas(
    @Param('id') id: string,
    @Body() dto: ActualizarTareasDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.mantenimientoService.actualizarTareas(id, dto.tareas, req.user);
  }

  @Delete('ordenes/:id')
  @Roles('ADMINISTRADOR', 'GERENCIA')
  remove(@Param('id') id: string, @Req() req: RequestConUsuario) {
    return this.mantenimientoService.remove(id, req.user);
  }

  // ===== PLAN DE MANTENIMIENTO PREVENTIVO =====
  @Get('planes')
  @Roles(...ROLES_LECTURA)
  listarPlanes() {
    return this.mantenimientoService.listarPlanes();
  }

  @Post('planes')
  @Roles(...ROLES_EDITORES)
  crearPlan(
    @Body() dto: CrearPlanMantenimientoDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.mantenimientoService.crearPlan(dto, req.user);
  }

  @Delete('planes/:id')
  @Roles('ADMINISTRADOR', 'GERENCIA')
  eliminarPlan(@Param('id') id: string, @Req() req: RequestConUsuario) {
    return this.mantenimientoService.eliminarPlan(id, req.user);
  }
}
