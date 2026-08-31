export class CotizacionItemDto {
  equipoId: string;
  cantidad?: number;
}

export class CrearCotizacionDto {
  clienteNombre: string;
  clienteEmpresa?: string;
  clienteEmail: string;
  clienteTelefono: string;
  mensaje?: string;
  items: CotizacionItemDto[];
}

// PENDIENTE | ENVIADA | APROBADA | CONTRATO | RECHAZADA
export const ESTADOS_COTIZACION = [
  'PENDIENTE',
  'ENVIADA',
  'APROBADA',
  'DESPACHADO',
  'CONTRATO',
  'RECHAZADA',
] as const;

export class CambiarEstadoCotizacionDto {
  estado: string;
}

// Datos necesarios para generar el ContratoAlquiler desde una cotización aprobada
export class ItemConvertirDto {
  equipoId: string;
  cantidad: number;
  precioUnitario?: number;
}

export class ConvertirCotizacionDto {
  proyecto: string;
  sede: string;
  fechaInicio: string;
  fechaFin: string;
  clienteDocumento?: string;
  condiciones?: string;
  observaciones?: string;
  items?: ItemConvertirDto[];
}


export class ValorizarCotizacionDto {
  config: any;
  precios: Record<string, number>;
}
