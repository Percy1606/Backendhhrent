export class CrearEquipoDto {
  codigoInterno?: string;
  nombre: string;
  familiaId?: string;
  subfamiliaId?: string;
  marca?: string;
  modelo?: string;
  serie?: string;
  anio?: number;
  proveedor?: string;
  costo?: number;
  valorComercial?: number;
  valorReposicion?: number;
  estado?: string;
  ubicacion: string;
  categoria: string;
  descripcion: string;
  precio?: number;
  unidad?: string;
  tipo: string;
  imagenUrl: string;
  imagenThumbUrl?: string;
  destacado?: boolean;
  observaciones?: string;
}

export class CambiarEstadoDto {
  estado: string;
  motivo?: string;
}

export class AgregarHistorialDto {
  tipo: string;
  descripcion: string;
  fecha?: string;
}

export class ListarEquiposDto {
  tipo?: string;
  estado?: string;
  familiaId?: string;
  ubicacion?: string;
  busqueda?: string;
}
