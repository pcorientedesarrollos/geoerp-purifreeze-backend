import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeoTipoServiciosService } from './geo_tipo-servicios.service';
import { CreateGeoTipoServicioDto } from './dto/create-geo_tipo-servicio.dto';
import { UpdateGeoTipoServicioDto } from './dto/update-geo_tipo-servicio.dto';

@Controller('geo-tipo-servicios')
export class GeoTipoServiciosController {
  constructor(private readonly geoTipoServiciosService: GeoTipoServiciosService) {}

  @Post()
  create(@Body() createGeoTipoServicioDto: CreateGeoTipoServicioDto) {
    return this.geoTipoServiciosService.create(createGeoTipoServicioDto);
  }

  @Get()
  findAll() {
    return this.geoTipoServiciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geoTipoServiciosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeoTipoServicioDto: UpdateGeoTipoServicioDto) {
    return this.geoTipoServiciosService.update(+id, updateGeoTipoServicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geoTipoServiciosService.remove(+id);
  }
}
