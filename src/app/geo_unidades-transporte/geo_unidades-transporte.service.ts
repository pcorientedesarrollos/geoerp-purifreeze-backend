import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGeoUnidadesTransporteDto } from './dto/create-geo_unidades-transporte.dto';
import { GeoUnidadesTransporte } from './entities/geo_unidades-transporte.entity';
import { UpdateGeoUnidadesTransporteDto } from './dto/update-geo_unidades-transporte.dto';

@Injectable()
export class GeoUnidadesTransporteService {
  constructor(
    @InjectRepository(GeoUnidadesTransporte)
    private readonly repo: Repository<GeoUnidadesTransporte>,
  ) {}

  create(dto: CreateGeoUnidadesTransporteDto) {
    const unidad = this.repo.create(dto);
    return this.repo.save(unidad);
  }

  findAll() {
    return this.repo.find({ relations: ['tipoUnidad'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { idUnidadTransporte: id },
      relations: ['tipoUnidad'],
    });
  }

  update(id: number, dto: UpdateGeoUnidadesTransporteDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
