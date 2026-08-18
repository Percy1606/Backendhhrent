import { TipoComprobante } from '@prisma/client';

export class CrearComprobanteDto {
  tipo: TipoComprobante;
  clienteTipoDoc?: string;
  clienteNumDoc: string;
  clienteRazon: string;
  clienteDireccion?: string;
  clienteEmail?: string;
  montoSubtotal: number;
  montoIgv: number;
  montoTotal: number;
  moneda?: string;
  contratoId?: string;
  observacion?: string;
}
