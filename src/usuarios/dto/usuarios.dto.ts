// ADMINISTRADOR | GERENCIA | COMERCIAL | LOGISTICA | OPERACIONES | CONTABILIDAD | ALMACEN | CONSULTA
export const ROLES_VALIDOS = [
  'ADMINISTRADOR',
  'GERENCIA',
  'COMERCIAL',
  'LOGISTICA',
  'OPERACIONES',
  'CONTABILIDAD',
  'ALMACEN',
  'CONSULTA',
] as const;

export class CrearUsuarioDto {
  nombre: string;
  email: string;
  password: string;
  rol: string;
}

export class ActualizarUsuarioDto {
  nombre?: string;
  email?: string;
  rol?: string;
  activo?: boolean;
}

export class CambiarPasswordUsuarioDto {
  password: string;
}
