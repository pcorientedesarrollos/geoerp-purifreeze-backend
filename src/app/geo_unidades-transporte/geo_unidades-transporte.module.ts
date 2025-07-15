import { Module } from '@nestjs/common';
import { GeoUnidadesTransporteService } from './geo_unidades-transporte.service';
import { GeoUnidadesTransporteController } from './geo_unidades-transporte.controller';

@Module({
  controllers: [GeoUnidadesTransporteController],
  providers: [GeoUnidadesTransporteService],
})
export class GeoUnidadesTransporteModule {}
