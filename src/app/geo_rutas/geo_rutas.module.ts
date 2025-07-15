import { Module } from '@nestjs/common';
import { GeoRutasService } from './geo_rutas.service';
import { GeoRutasController } from './geo_rutas.controller';

@Module({
  controllers: [GeoRutasController],
  providers: [GeoRutasService],
})
export class GeoRutasModule {}
