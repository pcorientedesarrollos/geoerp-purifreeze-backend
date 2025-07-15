import { Injectable } from '@nestjs/common';
import { CreateGeoRutasDetalleDto } from './dto/create-geo_rutas-detalle.dto';
import { UpdateGeoRutasDetalleDto } from './dto/update-geo_rutas-detalle.dto';

@Injectable()
export class GeoRutasDetalleService {
  create(createGeoRutasDetalleDto: CreateGeoRutasDetalleDto) {
    return 'This action adds a new geoRutasDetalle';
  }

  findAll() {
    return `This action returns all geoRutasDetalle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} geoRutasDetalle`;
  }

  update(id: number, updateGeoRutasDetalleDto: UpdateGeoRutasDetalleDto) {
    return `This action updates a #${id} geoRutasDetalle`;
  }

  remove(id: number) {
    return `This action removes a #${id} geoRutasDetalle`;
  }
}
