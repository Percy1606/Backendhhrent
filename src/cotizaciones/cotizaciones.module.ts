import { Module } from '@nestjs/common';
import { CotizacionesService } from './cotizaciones.service';
import { CotizacionesController } from './cotizaciones.controller';
import { AuditoriaModule } from '../auditoria/auditoria.module';
import { AlquileresModule } from '../alquileres/alquileres.module';

@Module({
  imports: [AuditoriaModule, AlquileresModule],
  controllers: [CotizacionesController],
  providers: [CotizacionesService],
})
export class CotizacionesModule {}
