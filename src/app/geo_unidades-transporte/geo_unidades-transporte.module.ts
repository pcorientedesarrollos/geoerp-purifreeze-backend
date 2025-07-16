import { Module } from '@nestjs/common';
import { GeoUnidadesTransporteService } from './geo_unidades-transporte.service';
import { GeoUnidadesTransporteController } from './geo_unidades-transporte.controller';
import { GeoUnidadesTransporte } from './entities/geo_unidades-transporte.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GeoUnidadesTransporte])],
  controllers: [GeoUnidadesTransporteController],
  providers: [GeoUnidadesTransporteService],
})
export class GeoUnidadesTransporteModule {}
