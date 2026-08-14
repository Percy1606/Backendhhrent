import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RestablecerPasswordDto } from './dto/restablecer-password.dto';
import { SolicitarResetDto } from './dto/solicitar-reset.dto';
import type { RequestConUsuario } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // PÚBLICO — solicitar enlace de restablecimiento (flujo "olvidé mi contraseña")
  @Post('olvide-password')
  solicitarReset(@Body() dto: SolicitarResetDto) {
    return this.authService.solicitarReset(dto);
  }

  // PÚBLICO — restablecer la contraseña con el token del enlace
  @Post('reset-password')
  restablecerPassword(@Body() dto: RestablecerPasswordDto) {
    return this.authService.restablecerPassword(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: RequestConUsuario) {
    return this.authService.perfil(req.user);
  }
}
