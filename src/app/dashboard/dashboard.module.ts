// RUTA: src/dashboard/dashboard.module.ts

import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// ¡IMPORTAMOS TODAS LAS ENTIDADES QUE EL SERVICIO USA!
import { GeoRutaEntity } from '../geo_rutas/entities/geo_ruta.entity';
import { GeoRecorridoEntity } from '../geo-recorrido/entities/geo-recorrido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeoRutaEntity, GeoRecorridoEntity])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
