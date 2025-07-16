import { Injectable } from '@nestjs/common';

import { UpdateGeoClienteDto } from './dto/update-geo_cliente.dto';
import { GeoCliente } from './entities/geo_cliente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGeoClienteDto } from './dto/create-geo_cliente.dto';

@Injectable()
export class GeoClientesService {
  constructor(
    @InjectRepository(GeoCliente)
    private readonly clienteRepository: Repository<GeoCliente>,
  ) {}

  create(createDto: CreateGeoClienteDto) {
    const nuevo = this.clienteRepository.create(createDto);
    return this.clienteRepository.save(nuevo);
  }

  findAll() {
    return this.clienteRepository.find();
  }

  findOne(id: number) {
    return this.clienteRepository.findOne({ where: { idcliente: id } });
  }

  update(id: number, updateDto: UpdateGeoClienteDto) {
    return this.clienteRepository.update(id, updateDto);
  }

  remove(id: number) {
    return this.clienteRepository.delete(id);
  }
}
