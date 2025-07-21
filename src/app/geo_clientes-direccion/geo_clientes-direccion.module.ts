import { Module } from '@nestjs/common';
import { GeoClientesDireccionService } from './geo_clientes-direccion.service';
import { GeoClientesDireccionController } from './geo_clientes-direccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoClienteDireccionEntity } from './entities/geo_clientes-direccion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GeoClienteDireccionEntity])
  ],
  controllers: [GeoClientesDireccionController],
  providers: [GeoClientesDireccionService],
})
export class GeoClientesDireccionModule {}