import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoRutasService } from './geo_rutas.service';
import { GeoRutasController } from './geo_rutas.controller';
import { GeoRutaEntity } from './entities/geo_ruta.entity';
import { GeoRutasParadaEntity } from '../geo-rutas-paradas/entities/geo-rutas-parada.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GeoRutaEntity,
      GeoRutasParadaEntity
    ])
  ],
  controllers: [GeoRutasController],
  providers: [GeoRutasService],
})
export class GeoRutasModule {}