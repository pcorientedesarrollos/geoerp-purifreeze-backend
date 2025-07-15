import { Injectable } from '@nestjs/common';
import { CreateGeoTipoUnidadeDto } from './dto/create-geo_tipo-unidade.dto';
import { UpdateGeoTipoUnidadeDto } from './dto/update-geo_tipo-unidade.dto';

@Injectable()
export class GeoTipoUnidadesService {
  create(createGeoTipoUnidadeDto: CreateGeoTipoUnidadeDto) {
    return 'This action adds a new geoTipoUnidade';
  }

  findAll() {
    return `This action returns all geoTipoUnidades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} geoTipoUnidade`;
  }

  update(id: number, updateGeoTipoUnidadeDto: UpdateGeoTipoUnidadeDto) {
    return `This action updates a #${id} geoTipoUnidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} geoTipoUnidade`;
  }
}
