import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoRutasService } from './geo_rutas.service';
import { GeoRutasController } from './geo_rutas.controller';
import { GeoRutaEntity } from './entities/geo_ruta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GeoRutaEntity,
    ])
  ],
  controllers: [GeoRutasController],
  providers: [GeoRutasService],
})
export class GeoRutasModule {}