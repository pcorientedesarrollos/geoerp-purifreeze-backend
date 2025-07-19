import { Injectable } from '@nestjs/common';
import { CreateGeoRutasParadaDto } from './dto/create-geo-rutas-parada.dto';
import { UpdateGeoRutasParadaDto } from './dto/update-geo-rutas-parada.dto';

@Injectable()
export class GeoRutasParadasService {
  create(createGeoRutasParadaDto: CreateGeoRutasParadaDto) {
    return 'This action adds a new geoRutasParada';
  }

  findAll() {
    return `This action returns all geoRutasParadas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} geoRutasParada`;
  }

  update(id: number, updateGeoRutasParadaDto: UpdateGeoRutasParadaDto) {
    return `This action updates a #${id} geoRutasParada`;
  }

  remove(id: number) {
    return `This action removes a #${id} geoRutasParada`;
  }
}
