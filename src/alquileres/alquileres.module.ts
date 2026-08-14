import { Module } from '@nestjs/common';
import { AlquileresService } from './alquileres.service';
import { AlquileresController } from './alquileres.controller';
import { AuditoriaModule } from '../auditoria/auditoria.module';

@Module({
  imports: [AuditoriaModule],
  controllers: [AlquileresController],
  providers: [AlquileresService],
  exports: [AlquileresService],
})
export class AlquileresModule {}
