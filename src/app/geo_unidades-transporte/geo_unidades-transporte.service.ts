import { Injectable } from '@nestjs/common';
import { CreateGeoUnidadesTransporteDto } from './dto/create-geo_unidades-transporte.dto';
import { UpdateGeoUnidadesTransporteDto } from './dto/update-geo_unidades-transporte.dto';

@Injectable()
export class GeoUnidadesTransporteService {
  create(createGeoUnidadesTransporteDto: CreateGeoUnidadesTransporteDto) {
    return 'This action adds a new geoUnidadesTransporte';
  }

  findAll() {
    return `This action returns all geoUnidadesTransporte`;
  }

  findOne(id: number) {
    return `This action returns a #${id} geoUnidadesTransporte`;
  }

  update(id: number, updateGeoUnidadesTransporteDto: UpdateGeoUnidadesTransporteDto) {
    return `This action updates a #${id} geoUnidadesTransporte`;
  }

  remove(id: number) {
    return `This action removes a #${id} geoUnidadesTransporte`;
  }
}
