import { Module } from '@nestjs/common';
import { FamiliasService } from './familias.service';
import { FamiliasController } from './familias.controller';
import { AuditoriaModule } from '../auditoria/auditoria.module';

@Module({
  imports: [AuditoriaModule],
  controllers: [FamiliasController],
  providers: [FamiliasService],
})
export class FamiliasModule {}
