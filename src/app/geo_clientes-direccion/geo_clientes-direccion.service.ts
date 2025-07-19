import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeoClienteDireccionEntity } from './entities/geo_clientes-direccion.entity';
import { CreateGeoClienteDireccionDto } from './dto/create-geo_clientes-direccion.dto';
import { UpdateGeoClienteDireccionDto } from './dto/update-geo_clientes-direccion.dto';

@Injectable()
export class GeoClientesDireccionService {
  constructor(
    @InjectRepository(GeoClienteDireccionEntity)
    private readonly direccionRepository: Repository<GeoClienteDireccionEntity>,
  ) {}

  create(createDto: CreateGeoClienteDireccionDto): Promise<GeoClienteDireccionEntity> {
    const nuevaDireccion = this.direccionRepository.create(createDto);
    return this.direccionRepository.save(nuevaDireccion);
  }

  findAll(): Promise<GeoClienteDireccionEntity[]> {
    return this.direccionRepository.find();
  }

  async findOne(id: number): Promise<GeoClienteDireccionEntity> {
    const direccion = await this.direccionRepository.findOneBy({ idDireccion: id });
    if (!direccion) {
      throw new NotFoundException(`La dirección con ID #${id} no fue encontrada.`);
    }
    return direccion;
  }

  async update(id: number, updateDto: UpdateGeoClienteDireccionDto): Promise<GeoClienteDireccionEntity> {
    const direccion = await this.direccionRepository.preload({
      idDireccion: id,
      ...updateDto,
    });
    if (!direccion) {
      throw new NotFoundException(`La dirección con ID #${id} no fue encontrada.`);
    }
    return this.direccionRepository.save(direccion);
  }

  async remove(id: number): Promise<{ message: string }> {
    const direccion = await this.findOne(id);
    await this.direccionRepository.remove(direccion);
    return { message: `La dirección con ID #${id} ha sido eliminada.` };
  }
}