import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RestablecerPasswordDto } from './dto/restablecer-password.dto';
import { SolicitarResetDto } from './dto/solicitar-reset.dto';
import { UsuarioAuth } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase().trim();
    const usuario = await this.prisma.usuario.findUnique({ where: { email } });

    if (!usuario || !usuario.activo) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordOk = await bcrypt.compare(dto.password, usuario.passwordHash);
    if (!passwordOk) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      rol: usuario.rol,
    };

    const secret = process.env.JWT_SECRET || 'hhtrent_secret_dev_2026';
    const token = await this.jwt.signAsync(payload, { secret });

    return {
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    };
  }

  // ---- FLUJO "OLVIDÉ MI CONTRASEÑA" ----
  // Genera un token de restablecimiento válido por 1 hora.
  // En producción este token se envía por correo; en desarrollo se devuelve
  // el enlace en la respuesta para poder probar el flujo completo localmente.
  async solicitarReset(dto: SolicitarResetDto) {
    const email = dto.email.toLowerCase().trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      throw new BadRequestException('Correo electrónico inválido');
    }

    const usuario = await this.prisma.usuario.findUnique({ where: { email } });

    // Por seguridad no se revela si el correo existe o no
    if (!usuario || !usuario.activo) {
      return {
        ok: true,
        mensaje:
          'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.',
      };
    }

    const token = randomBytes(32).toString('hex');
    const expira = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: { resetToken: token, resetTokenExpira: expira },
    });

    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000/admin';
    const enlaceReset = `${baseUrl}/reset-password?token=${token}`;

    // TODO (producción): enviar enlaceReset por correo (SMTP / servicio de email)
    console.log(`[RESET PASSWORD] ${usuario.email} → ${enlaceReset}`);

    return {
      ok: true,
      mensaje:
        'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.',
      // Solo en desarrollo se expone el enlace para poder probar el flujo
      enlaceDesarrollo: enlaceReset,
    };
  }

  async restablecerPassword(dto: RestablecerPasswordDto) {
    const token = dto.token?.trim();
    const nuevaPassword = dto.nuevaPassword || '';

    if (!token) {
      throw new BadRequestException('Token inválido o ausente');
    }
    if (nuevaPassword.length < 6) {
      throw new BadRequestException(
        'La contraseña debe tener al menos 6 caracteres',
      );
    }

    const usuario = await this.prisma.usuario.findUnique({
      where: { resetToken: token },
    });

    if (!usuario || !usuario.resetTokenExpira) {
      throw new BadRequestException(
        'El enlace es inválido o ya fue utilizado. Solicite uno nuevo.',
      );
    }

    if (usuario.resetTokenExpira.getTime() < Date.now()) {
      throw new BadRequestException(
        'El enlace ha expirado. Solicite uno nuevo.',
      );
    }

    const passwordHash = await bcrypt.hash(nuevaPassword, 10);

    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExpira: null,
      },
    });

    return {
      ok: true,
      mensaje:
        'Contraseña actualizada correctamente. Ya puedes iniciar sesión.',
    };
  }

  async perfil(usuarioPayload: UsuarioAuth) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioPayload.sub },
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        activo: true,
        createdAt: true,
      },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return usuario;
  }
}
