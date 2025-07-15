import { Module } from '@nestjs/common';
import { GeoRutasDetalleService } from './geo_rutas-detalle.service';
import { GeoRutasDetalleController } from './geo_rutas-detalle.controller';

@Module({
  controllers: [GeoRutasDetalleController],
  providers: [GeoRutasDetalleService],
})
export class GeoRutasDetalleModule {}
