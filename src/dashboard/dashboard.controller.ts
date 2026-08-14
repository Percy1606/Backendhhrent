import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('resumen')
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
  resumen(@Query('desde') desde?: string, @Query('hasta') hasta?: string) {
    return this.dashboardService.resumen(desde, hasta);
  }
}
