import { Module } from '@nestjs/common';
import { GeoClientesService } from './geo_clientes.service';
import { GeoClientesController } from './geo_clientes.controller';

@Module({
  controllers: [GeoClientesController],
  providers: [GeoClientesService],
})
export class GeoClientesModule {}
