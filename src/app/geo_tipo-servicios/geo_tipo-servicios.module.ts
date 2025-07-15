import { Module } from '@nestjs/common';
import { GeoTipoServiciosService } from './geo_tipo-servicios.service';
import { GeoTipoServiciosController } from './geo_tipo-servicios.controller';

@Module({
  controllers: [GeoTipoServiciosController],
  providers: [GeoTipoServiciosService],
})
export class GeoTipoServiciosModule {}
