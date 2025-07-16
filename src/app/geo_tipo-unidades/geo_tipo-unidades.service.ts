import { GeoTipoUnidade } from './entities/geo_tipo-unidade.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeoTipoUnidadeDto } from './dto/create-geo_tipo-unidade.dto';
import { UpdateGeoTipoUnidadeDto } from './dto/update-geo_tipo-unidade.dto';

@Injectable()
export class GeoTipoUnidadesService {
  constructor(
    @InjectRepository(GeoTipoUnidade)
    private readonly repo: Repository<GeoTipoUnidade>,
  ) {}

  create(createGeoTipoUnidadeDto: CreateGeoTipoUnidadeDto) {
    const nuevo = this.repo.create(createGeoTipoUnidadeDto);
    return this.repo.save(nuevo);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ idTipoUnidad: id });
  }

  update(id: number, updateGeoTipoUnidadeDto: UpdateGeoTipoUnidadeDto) {
    return this.repo.update(id, updateGeoTipoUnidadeDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
