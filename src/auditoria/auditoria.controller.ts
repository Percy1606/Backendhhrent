import { Body, Controller, Delete, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuditoriaService } from './auditoria.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import type { RequestConUsuario } from '../auth/auth.types';

@Controller('auditoria')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditoriaController {
  constructor(private readonly auditoriaService: AuditoriaService) {}

  @Get()
  @Roles('ADMINISTRADOR', 'GERENCIA')
  listar(
    @Query('entidad') entidad?: string,
    @Query('email') email?: string,
    @Query('limite') limite?: number,
  ) {
    return this.auditoriaService.listar({ entidad, email, limite });
  }

  @Delete('purgar')
  @Roles('ADMINISTRADOR', 'GERENCIA')
  purgar(
    @Body('opcion') opcion: 'TODOS' | '30_DIAS' | '90_DIAS',
    @Req() req: RequestConUsuario,
  ) {
    return this.auditoriaService.purgar(opcion || 'TODOS', req.user);
  }
}
