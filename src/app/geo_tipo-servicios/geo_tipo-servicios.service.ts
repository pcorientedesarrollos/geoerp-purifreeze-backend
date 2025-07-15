import { Injectable } from '@nestjs/common';
import { CreateGeoTipoServicioDto } from './dto/create-geo_tipo-servicio.dto';
import { UpdateGeoTipoServicioDto } from './dto/update-geo_tipo-servicio.dto';

@Injectable()
export class GeoTipoServiciosService {
  create(createGeoTipoServicioDto: CreateGeoTipoServicioDto) {
    return 'This action adds a new geoTipoServicio';
  }

  findAll() {
    return `This action returns all geoTipoServicios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} geoTipoServicio`;
  }

  update(id: number, updateGeoTipoServicioDto: UpdateGeoTipoServicioDto) {
    return `This action updates a #${id} geoTipoServicio`;
  }

  remove(id: number) {
    return `This action removes a #${id} geoTipoServicio`;
  }
}
