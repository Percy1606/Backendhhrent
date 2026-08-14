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
export class ConvertirCotizacionDto {
  proyecto: string;
  sede: string;
  fechaInicio: string;
  fechaFin: string;
  condiciones?: string;
  observaciones?: string;
}
