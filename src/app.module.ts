import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EquiposModule } from './equipos/equipos.module';
import { FamiliasModule } from './familias/familias.module';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { AlquileresModule } from './alquileres/alquileres.module';
import { MantenimientoModule } from './mantenimiento/mantenimiento.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CotizacionesModule } from './cotizaciones/cotizaciones.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ComprobantesModule } from './comprobantes/comprobantes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    EquiposModule,
    FamiliasModule,
    AuditoriaModule,
    AlquileresModule,
    MantenimientoModule,
    DashboardModule,
    CotizacionesModule,
    UsuariosModule,
    ComprobantesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
