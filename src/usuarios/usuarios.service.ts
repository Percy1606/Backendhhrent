import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { UsuarioAuth } from '../auth/auth.types';
import {
  ActualizarUsuarioDto,
  CambiarPasswordUsuarioDto,
  CrearUsuarioDto,
  ROLES_VALIDOS,
} from './dto/usuarios.dto';

const SELECCION_SIN_PASSWORD = {
  id: true,
  nombre: true,
  email: true,
  rol: true,
  activo: true,
  createdAt: true,
} as const;

@Injectable()
export class UsuariosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditoria: AuditoriaService,
  ) {}

  private validarRol(rol: string) {
    if (!ROLES_VALIDOS.includes(rol as (typeof ROLES_VALIDOS)[number])) {
      throw new BadRequestException(
        `Rol inválido. Use: ${ROLES_VALIDOS.join(', ')}`,
      );
    }
  }

  private validarEmail(email: string) {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      throw new BadRequestException('Correo electrónico inválido');
    }
  }

  async listar() {
    return this.prisma.usuario.findMany({
      select: SELECCION_SIN_PASSWORD,
      orderBy: { createdAt: 'asc' },
    });
  }

  async crear(dto: CrearUsuarioDto, usuario?: UsuarioAuth) {
    if (!dto.nombre?.trim()) {
      throw new BadRequestException('El nombre es obligatorio');
    }
    if (!dto.password || dto.password.length < 6) {
      throw new BadRequestException(
        'La contraseña debe tener al menos 6 caracteres',
      );
    }
    const email = dto.email.toLowerCase().trim();
    this.validarEmail(email);
    this.validarRol(dto.rol);
    const existente = await this.prisma.usuario.findUnique({
      where: { email },
    });
    if (existente) {
      throw new BadRequestException('Ya existe un usuario con ese correo');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const creado = await this.prisma.usuario.create({
      data: {
        nombre: dto.nombre.trim(),
        email,
        passwordHash,
        rol: dto.rol as (typeof ROLES_VALIDOS)[number],
      },
      select: SELECCION_SIN_PASSWORD,
    });

    await this.auditoria.registrar(
      usuario,
      'CREAR_USUARIO',
      'Usuario',
      creado.id,
      {
        nombre: creado.nombre,
        email: creado.email,
        rol: creado.rol,
      },
    );

    return creado;
  }

  async actualizar(
    id: string,
    dto: ActualizarUsuarioDto,
    usuario?: UsuarioAuth,
  ) {
    const existente = await this.prisma.usuario.findUnique({ where: { id } });
    if (!existente) throw new NotFoundException('Usuario no encontrado');

    // Auto-protección: nadie puede desactivar su propia cuenta ni cambiar su propio rol
    if (usuario?.sub === id) {
      if (dto.activo === false) {
        throw new BadRequestException('No puedes desactivar tu propia cuenta');
      }
      if (dto.rol && dto.rol !== existente.rol) {
        throw new BadRequestException('No puedes cambiar tu propio rol');
      }
    }

    if (dto.rol) this.validarRol(dto.rol);
    if (dto.email) {
      const email = dto.email.toLowerCase().trim();
      this.validarEmail(email);
      if (email !== existente.email) {
        const duplicado = await this.prisma.usuario.findUnique({
          where: { email },
        });
        if (duplicado) {
          throw new BadRequestException('Ya existe un usuario con ese correo');
        }
      }
    }

    const actualizado = await this.prisma.usuario.update({
      where: { id },
      data: {
        nombre: dto.nombre?.trim() ?? undefined,
        email: dto.email ? dto.email.toLowerCase().trim() : undefined,
        rol: dto.rol as (typeof ROLES_VALIDOS)[number] | undefined,
        activo: dto.activo,
      },
      select: SELECCION_SIN_PASSWORD,
    });

    await this.auditoria.registrar(
      usuario,
      'ACTUALIZAR_USUARIO',
      'Usuario',
      id,
      {
        nombre: actualizado.nombre,
        email: actualizado.email,
        rol: actualizado.rol,
        activo: actualizado.activo,
      },
    );

    return actualizado;
  }

  async cambiarPassword(
    id: string,
    dto: CambiarPasswordUsuarioDto,
    usuario?: UsuarioAuth,
  ) {
    const existente = await this.prisma.usuario.findUnique({ where: { id } });
    if (!existente) throw new NotFoundException('Usuario no encontrado');

    if (!dto.password || dto.password.length < 6) {
      throw new BadRequestException(
        'La contraseña debe tener al menos 6 caracteres',
      );
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    await this.prisma.usuario.update({
      where: { id },
      data: { passwordHash },
    });

    await this.auditoria.registrar(
      usuario,
      'CAMBIAR_PASSWORD_USUARIO',
      'Usuario',
      id,
      { email: existente.email },
    );

    return { ok: true };
  }
}
