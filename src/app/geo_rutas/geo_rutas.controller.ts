import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeoRutasService } from './geo_rutas.service';
import { CreateGeoRutaDto } from './dto/create-geo_ruta.dto';
import { UpdateGeoRutaDto } from './dto/update-geo_ruta.dto';

@Controller('geo-rutas')
export class GeoRutasController {
  constructor(private readonly geoRutasService: GeoRutasService) {}

  @Post()
  create(@Body() createGeoRutaDto: CreateGeoRutaDto) {
    return this.geoRutasService.create(createGeoRutaDto);
  }

  @Get()
  findAll() {
    return this.geoRutasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geoRutasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeoRutaDto: UpdateGeoRutaDto) {
    return this.geoRutasService.update(+id, updateGeoRutaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geoRutasService.remove(+id);
  }
}
