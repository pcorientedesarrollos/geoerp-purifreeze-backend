import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosService } from './geo_servicios.service';
import { ServiciosController } from './geo_servicios.controller';
import { GeoServicio } from './entities/geo_servicio.entity';


@Module({
    imports: [
      TypeOrmModule.forFeature([ GeoServicio]) // Registra la entidad de detalle
    ],
  controllers: [ServiciosController],
  providers: [ServiciosService],
})
export class GeoServiciosModule {}
