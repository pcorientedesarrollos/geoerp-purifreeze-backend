import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeoTipoServicioDto } from './dto/create-geo_tipo-servicio.dto';
import { UpdateGeoTipoServicioDto } from './dto/update-geo_tipo-servicio.dto';
import { GeoTipoServicioEntity } from './entities/geo_tipo-servicio.entity';

@Injectable()
export class GeoTipoServiciosService {
  constructor(
    @InjectRepository(GeoTipoServicioEntity)
    private readonly tipoServicioRepository: Repository<GeoTipoServicioEntity>,
  ) {}

  create(createDto: CreateGeoTipoServicioDto): Promise<GeoTipoServicioEntity> {
    const nuevoTipo = this.tipoServicioRepository.create(createDto);
    return this.tipoServicioRepository.save(nuevoTipo);
  }

  findAll(): Promise<GeoTipoServicioEntity[]> {
    return this.tipoServicioRepository.find();
  }

  async findOne(id: number): Promise<GeoTipoServicioEntity> {
    const tipoServicio = await this.tipoServicioRepository.findOneBy({ idTipoServicio: id });
    if (!tipoServicio) {
      throw new NotFoundException(`El tipo de servicio con ID #${id} no fue encontrado.`);
    }
    return tipoServicio;
  }

  async update(id: number, updateDto: UpdateGeoTipoServicioDto): Promise<GeoTipoServicioEntity> {
    const tipoServicio = await this.tipoServicioRepository.preload({
      idTipoServicio: id,
      ...updateDto,
    });
    if (!tipoServicio) {
      throw new NotFoundException(`El tipo de servicio con ID #${id} no fue encontrado.`);
    }
    return this.tipoServicioRepository.save(tipoServicio);
  }

  async remove(id: number): Promise<{ message: string }> {
    const tipoServicio = await this.findOne(id);
    await this.tipoServicioRepository.remove(tipoServicio);
    return { message: `El tipo de servicio con ID #${id} ha sido eliminado.` };
  }
}