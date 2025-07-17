import { Module } from '@nestjs/common';
import { GeoClientesDireccionService } from './geo_clientes-direccion.service';
import { GeoClientesDireccionController } from './geo_clientes-direccion.controller';

@Module({
  controllers: [GeoClientesDireccionController],
  providers: [GeoClientesDireccionService],
})
export class GeoClientesDireccionModule {}
