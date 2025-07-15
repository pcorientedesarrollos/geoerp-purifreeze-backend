import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeoRutasDetalleService } from './geo_rutas-detalle.service';
import { CreateGeoRutasDetalleDto } from './dto/create-geo_rutas-detalle.dto';
import { UpdateGeoRutasDetalleDto } from './dto/update-geo_rutas-detalle.dto';

@Controller('geo-rutas-detalle')
export class GeoRutasDetalleController {
  constructor(private readonly geoRutasDetalleService: GeoRutasDetalleService) {}

  @Post()
  create(@Body() createGeoRutasDetalleDto: CreateGeoRutasDetalleDto) {
    return this.geoRutasDetalleService.create(createGeoRutasDetalleDto);
  }

  @Get()
  findAll() {
    return this.geoRutasDetalleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geoRutasDetalleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeoRutasDetalleDto: UpdateGeoRutasDetalleDto) {
    return this.geoRutasDetalleService.update(+id, updateGeoRutasDetalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geoRutasDetalleService.remove(+id);
  }
}
