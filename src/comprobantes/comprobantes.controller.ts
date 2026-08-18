import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ComprobantesService } from './comprobantes.service';
import { CrearComprobanteDto } from './dto/crear-comprobante.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('comprobantes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ComprobantesController {
  constructor(private readonly comprobantesService: ComprobantesService) {}

  @Get()
  @Roles('ADMINISTRADOR', 'GERENCIA', 'COMERCIAL', 'CONTABILIDAD')
  listar(@Query('tipo') tipo?: string, @Query('busqueda') busqueda?: string) {
    return this.comprobantesService.listar(tipo, busqueda);
  }

  @Get(':id')
  @Roles('ADMINISTRADOR', 'GERENCIA', 'COMERCIAL', 'CONTABILIDAD')
  obtener(@Param('id') id: string) {
    return this.comprobantesService.obtenerPorId(id);
  }

  @Post()
  @Roles('ADMINISTRADOR', 'GERENCIA', 'COMERCIAL', 'CONTABILIDAD')
  crear(@Body() dto: CrearComprobanteDto) {
    return this.comprobantesService.crearComprobante(dto);
  }
}
