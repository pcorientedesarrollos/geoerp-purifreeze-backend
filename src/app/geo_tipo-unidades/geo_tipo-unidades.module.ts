import { Module } from '@nestjs/common';
import { GeoTipoUnidadesService } from './geo_tipo-unidades.service';
import { GeoTipoUnidadesController } from './geo_tipo-unidades.controller';

@Module({
  controllers: [GeoTipoUnidadesController],
  providers: [GeoTipoUnidadesService],
})
export class GeoTipoUnidadesModule {}
