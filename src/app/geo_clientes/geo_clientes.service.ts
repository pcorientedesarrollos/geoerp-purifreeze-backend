import { Injectable } from '@nestjs/common';
import { CreateGeoClienteDto } from './dto/create-geo_cliente.dto';
import { UpdateGeoClienteDto } from './dto/update-geo_cliente.dto';

@Injectable()
export class GeoClientesService {
  create(createGeoClienteDto: CreateGeoClienteDto) {
    return 'This action adds a new geoCliente';
  }

  findAll() {
    return `This action returns all geoClientes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} geoCliente`;
  }

  update(id: number, updateGeoClienteDto: UpdateGeoClienteDto) {
    return `This action updates a #${id} geoCliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} geoCliente`;
  }
}
