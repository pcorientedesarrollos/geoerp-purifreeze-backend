import { Module } from '@nestjs/common';
import { GeoClientesService } from './geo_clientes.service';
import { GeoClientesController } from './geo_clientes.controller';
import { GeoCliente } from './entities/geo_cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GeoCliente])],
  controllers: [GeoClientesController],
  providers: [GeoClientesService],
})
export class GeoClientesModule {}
