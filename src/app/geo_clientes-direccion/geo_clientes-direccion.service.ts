import { Injectable } from '@nestjs/common';
import { CreateGeoClientesDireccionDto } from './dto/create-geo_clientes-direccion.dto';
import { UpdateGeoClientesDireccionDto } from './dto/update-geo_clientes-direccion.dto';

@Injectable()
export class GeoClientesDireccionService {
  create(createGeoClientesDireccionDto: CreateGeoClientesDireccionDto) {
    return 'This action adds a new geoClientesDireccion';
  }

  findAll() {
    return `This action returns all geoClientesDireccion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} geoClientesDireccion`;
  }

  update(id: number, updateGeoClientesDireccionDto: UpdateGeoClientesDireccionDto) {
    return `This action updates a #${id} geoClientesDireccion`;
  }

  remove(id: number) {
    return `This action removes a #${id} geoClientesDireccion`;
  }
}
