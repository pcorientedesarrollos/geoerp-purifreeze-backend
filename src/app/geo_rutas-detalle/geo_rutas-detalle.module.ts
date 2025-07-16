import { Module } from '@nestjs/common';
import { GeoRutasDetalleService } from './geo_rutas-detalle.service';
import { GeoRutasDetalleController } from './geo_rutas-detalle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoRutaDetalleEntity } from './entities/geo_rutas-detalle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GeoRutaDetalleEntity]) // Registra la entidad de detalle
  ],
  controllers: [GeoRutasDetalleController],
  providers: [GeoRutasDetalleService],
})
export class GeoRutasDetalleModule {}