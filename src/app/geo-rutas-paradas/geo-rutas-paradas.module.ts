import { Module } from '@nestjs/common';
import { GeoRutasParadasService } from './geo-rutas-paradas.service';
import { GeoRutasParadasController } from './geo-rutas-paradas.controller';

@Module({
  controllers: [GeoRutasParadasController],
  providers: [GeoRutasParadasService],
})
export class GeoRutasParadasModule {}
