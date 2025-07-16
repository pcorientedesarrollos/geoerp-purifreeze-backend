import { Module } from '@nestjs/common';
import { GeoTipoUnidadesService } from './geo_tipo-unidades.service';
import { GeoTipoUnidadesController } from './geo_tipo-unidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoTipoUnidade } from './entities/geo_tipo-unidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeoTipoUnidade])],
  controllers: [GeoTipoUnidadesController],
  providers: [GeoTipoUnidadesService],
})
export class GeoTipoUnidadesModule {}
