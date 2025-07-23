import { Module } from '@nestjs/common';
import { GeoRutasParadasService } from './geo-rutas-paradas.service';
import { GeoRutasParadasController } from './geo-rutas-paradas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoRutasParadaEntity } from './entities/geo-rutas-parada.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GeoRutasParadaEntity]) // Registra la entidad de parada
  ],
  controllers: [GeoRutasParadasController],
  providers: [GeoRutasParadasService],
})
export class GeoRutasParadasModule {}