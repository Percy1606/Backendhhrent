export interface UsuarioAuth {
  sub: string;
  email: string;
  nombre: string;
  rol: string;
}

export interface RequestConUsuario {
  user: UsuarioAuth;
  ip?: string;
  headers: Record<string, string | string[] | undefined>;
}
