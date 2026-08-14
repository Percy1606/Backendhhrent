import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import type { RequestConUsuario } from '../auth/auth.types';
import {
  ActualizarUsuarioDto,
  CambiarPasswordUsuarioDto,
  CrearUsuarioDto,
} from './dto/usuarios.dto';

@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @Roles('ADMINISTRADOR', 'GERENCIA')
  listar() {
    return this.usuariosService.listar();
  }

  @Post()
  @Roles('ADMINISTRADOR')
  crear(@Body() dto: CrearUsuarioDto, @Req() req: RequestConUsuario) {
    return this.usuariosService.crear(dto, req.user);
  }

  @Patch(':id')
  @Roles('ADMINISTRADOR')
  actualizar(
    @Param('id') id: string,
    @Body() dto: ActualizarUsuarioDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.usuariosService.actualizar(id, dto, req.user);
  }

  @Patch(':id/password')
  @Roles('ADMINISTRADOR')
  cambiarPassword(
    @Param('id') id: string,
    @Body() dto: CambiarPasswordUsuarioDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.usuariosService.cambiarPassword(id, dto, req.user);
  }
}
