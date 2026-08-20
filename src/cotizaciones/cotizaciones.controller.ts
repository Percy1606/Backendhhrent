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
import { CotizacionesService } from './cotizaciones.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import type { RequestConUsuario } from '../auth/auth.types';
import {
  CambiarEstadoCotizacionDto,
  ConvertirCotizacionDto,
  CrearCotizacionDto,
} from './dto/cotizaciones.dto';

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

@Controller('cotizaciones')
export class CotizacionesController {
  constructor(private readonly cotizacionesService: CotizacionesService) {}

  // PÚBLICO — recibe solicitudes desde el sitio web (sin token)
  @Post()
  crear(@Body() dto: CrearCotizacionDto) {
    return this.cotizacionesService.crear(dto);
  }

  // PÚBLICO — Rastrear pedido/cotización por número de ticket o ID
  @Get('track/:ticket')
  track(@Param('ticket') ticket: string) {
    return this.cotizacionesService.track(ticket);
  }

  // ADMIN — Guardar valores de proforma y cotizar
  @Post(':id/valorizar')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...ROLES_LECTURA)
  valorizar(@Param('id') id: string, @Body() dto: any) {
    return this.cotizacionesService.valorizar(id, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...ROLES_LECTURA)
  listar() {
    return this.cotizacionesService.listar();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...ROLES_LECTURA)
  detalle(@Param('id') id: string) {
    return this.cotizacionesService.detalle(id);
  }

  @Patch(':id/estado')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR', 'GERENCIA', 'COMERCIAL', 'CONTABILIDAD')
  cambiarEstado(
    @Param('id') id: string,
    @Body() dto: CambiarEstadoCotizacionDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.cotizacionesService.cambiarEstado(id, dto, req.user);
  }

  // Genera un ContratoAlquiler desde una cotización APROBADA
  @Post(':id/contrato')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR', 'GERENCIA', 'COMERCIAL', 'LOGISTICA')
  convertirAcontrato(
    @Param('id') id: string,
    @Body() dto: ConvertirCotizacionDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.cotizacionesService.convertirAcontrato(id, dto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR', 'GERENCIA')
  eliminar(
    @Param('id') id: string,
    @Body() body: { password?: string },
    @Req() req: RequestConUsuario,
  ) {
    return this.cotizacionesService.eliminar(id, req.user, body?.password);
  }
}
