import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsuarioAuth } from './auth.types';

interface AutenticatedRequest {
  user?: UsuarioAuth;
  headers: Record<string, string | string[] | undefined>;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AutenticatedRequest>();
    const authHeader = request.headers['authorization'];
    if (typeof authHeader !== 'string' || !authHeader) {
      throw new UnauthorizedException('No se encontró token de autenticación');
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Formato de token inválido');
    }

    try {
      const secret = this.config.get<string>('JWT_SECRET');
      if (!secret) {
        throw new UnauthorizedException('Configuración de autenticación inválida');
      }
      const payload = await this.jwt.verifyAsync<UsuarioAuth>(token, {
        secret,
      });
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Sesión expirada o token inválido');
    }
  }
}
