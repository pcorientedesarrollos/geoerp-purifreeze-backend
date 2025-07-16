import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GeoTipoServiciosService } from './geo_tipo-servicios.service';
import { CreateGeoTipoServicioDto } from './dto/create-geo_tipo-servicio.dto';
import { UpdateGeoTipoServicioDto } from './dto/update-geo_tipo-servicio.dto';

@Controller('geo-tipo-servicios')
export class GeoTipoServiciosController {
  constructor(private readonly geoTipoServiciosService: GeoTipoServiciosService) {}

  @Post()
  create(@Body() createDto: CreateGeoTipoServicioDto) {
    return this.geoTipoServiciosService.create(createDto);
  }

  @Get()
  findAll() {
    return this.geoTipoServiciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.geoTipoServiciosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateGeoTipoServicioDto) {
    return this.geoTipoServiciosService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.geoTipoServiciosService.remove(id);
  }
}