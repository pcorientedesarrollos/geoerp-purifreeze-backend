import { Module } from '@nestjs/common';
import { GeoTipoServiciosService } from './geo_tipo-servicios.service';
import { GeoTipoServiciosController } from './geo_tipo-servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoTipoServicioEntity } from './entities/geo_tipo-servicio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GeoTipoServicioEntity]) // Registra la entidad
  ],
  controllers: [GeoTipoServiciosController],
  providers: [GeoTipoServiciosService],
})
export class GeoTipoServiciosModule {}