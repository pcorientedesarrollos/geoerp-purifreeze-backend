import { Injectable } from '@nestjs/common';
import { CreateGeoRutaDto } from './dto/create-geo_ruta.dto';
import { UpdateGeoRutaDto } from './dto/update-geo_ruta.dto';

@Injectable()
export class GeoRutasService {
  create(createGeoRutaDto: CreateGeoRutaDto) {
    return 'This action adds a new geoRuta';
  }

  findAll() {
    return `This action returns all geoRutas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} geoRuta`;
  }

  update(id: number, updateGeoRutaDto: UpdateGeoRutaDto) {
    return `This action updates a #${id} geoRuta`;
  }

  remove(id: number) {
    return `This action removes a #${id} geoRuta`;
  }
}
