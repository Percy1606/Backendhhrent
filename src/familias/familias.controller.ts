import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FamiliasService } from './familias.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import type { RequestConUsuario } from '../auth/auth.types';

@Controller('familias')
export class FamiliasController {
  constructor(private readonly familiasService: FamiliasService) {}

  @Get()
  findAll() {
    return this.familiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familiasService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR', 'GERENCIA')
  create(
    @Body() body: { nombre: string; descripcion?: string },
    @Req() req: RequestConUsuario,
  ) {
    return this.familiasService.create(body.nombre, body.descripcion, req.user);
  }

  @Post(':id/subfamilias')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR', 'GERENCIA')
  crearSubfamilia(
    @Param('id') id: string,
    @Body() body: { nombre: string },
    @Req() req: RequestConUsuario,
  ) {
    return this.familiasService.crearSubfamilia(id, body.nombre, req.user);
  }

  @Delete('subfamilias/:subId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR', 'GERENCIA')
  removeSubfamilia(
    @Param('subId') subId: string,
    @Req() req: RequestConUsuario,
  ) {
    return this.familiasService.removeSubfamilia(subId, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR', 'GERENCIA')
  remove(@Param('id') id: string, @Req() req: RequestConUsuario) {
    return this.familiasService.remove(id, req.user);
  }
}
