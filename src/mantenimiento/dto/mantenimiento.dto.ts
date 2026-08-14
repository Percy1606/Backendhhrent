export class TareaMantenimientoDto {
  descripcion: string;
  realizado?: boolean;
  observacion?: string;
}

export class CrearOrdenTrabajoDto {
  equipoId: string;
  // PREVENTIVO | CORRECTIVO | CALIBRACION | INSPECCION
  tipo: string;
  // BAJA | MEDIA | ALTA | URGENTE
  prioridad?: string;
  descripcion: string;
  fechaProgramada: string;
  tecnicoResponsable?: string;
  observaciones?: string;
  tareas?: TareaMantenimientoDto[];
}

export class ActualizarOrdenTrabajoDto {
  tipo?: string;
  prioridad?: string;
  descripcion?: string;
  fechaProgramada?: string;
  tecnicoResponsable?: string;
  observaciones?: string;
  tareas?: TareaMantenimientoDto[];
}

export class CambiarEstadoOrdenDto {
  // INICIAR | COMPLETAR | CANCELAR
  estado: string;
  costoRepuestos?: number;
  costoManoObra?: number;
  observaciones?: string;
}

export class ActualizarTareasDto {
  tareas: TareaMantenimientoDto[];
}

export class CrearPlanMantenimientoDto {
  equipoId: string;
  // MENSUAL | TRIMESTRAL | SEMESTRAL | ANUAL
  frecuencia: string;
  descripcion: string;
  proximaFecha: string;
}
