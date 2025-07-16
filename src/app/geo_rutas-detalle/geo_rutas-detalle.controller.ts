import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GeoRutasDetalleService } from './geo_rutas-detalle.service';
import { CreateGeoRutaDetalleDto } from './dto/create-geo_rutas-detalle.dto';
import { UpdateGeoRutaDetalleDto } from './dto/update-geo_rutas-detalle.dto';

@Controller('geo-rutas-detalle')
export class GeoRutasDetalleController {
  constructor(private readonly geoRutasDetalleService: GeoRutasDetalleService) {}

  @Post()
  create(@Body() createDto: CreateGeoRutaDetalleDto) {
    return this.geoRutasDetalleService.create(createDto);
  }

  @Get()
  findAll() {
    return this.geoRutasDetalleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.geoRutasDetalleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateGeoRutaDetalleDto) {
    return this.geoRutasDetalleService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.geoRutasDetalleService.remove(id);
  }
}