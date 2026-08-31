export class ItemContratoDto {
  equipoId: string;
  cantidad?: number;
  precioUnitario?: number;
}

export class CrearContratoDto {
  clienteNombre: string;
  clienteEmpresa?: string;
  clienteDocumento?: string;
  clienteEmail: string;
  clienteTelefono: string;
  proyecto: string;
  sede: string;
  fechaInicio: string;
  fechaFin: string;
  condiciones?: string;
  observaciones?: string;
  items: ItemContratoDto[];
}

export class ActualizarContratoDto {
  clienteNombre?: string;
  clienteEmpresa?: string;
  clienteDocumento?: string;
  clienteEmail?: string;
  clienteTelefono?: string;
  proyecto?: string;
  sede?: string;
  fechaInicio?: string;
  fechaFin?: string;
  condiciones?: string;
  observaciones?: string;
  items?: ItemContratoDto[];
}

export class CambiarEstadoContratoDto {
  // CONFIRMAR | INICIAR | FINALIZAR | CANCELAR
  estado: string;
  motivo?: string;
}

export class ItemInspeccionDto {
  descripcion: string;
  resultado: string; // OK | NO_OK | NA
  observacion?: string;
}

export class RegistrarInspeccionDto {
  tipo: string; // ENTREGA | RETORNO
  responsableNombre?: string;
  observaciones?: string;
  items: ItemInspeccionDto[];
}
