import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeoClientesDireccionService } from './geo_clientes-direccion.service';
import { CreateGeoClientesDireccionDto } from './dto/create-geo_clientes-direccion.dto';
import { UpdateGeoClientesDireccionDto } from './dto/update-geo_clientes-direccion.dto';

@Controller('geo-clientes-direccion')
export class GeoClientesDireccionController {
  constructor(private readonly geoClientesDireccionService: GeoClientesDireccionService) {}

  @Post()
  create(@Body() createGeoClientesDireccionDto: CreateGeoClientesDireccionDto) {
    return this.geoClientesDireccionService.create(createGeoClientesDireccionDto);
  }

  @Get()
  findAll() {
    return this.geoClientesDireccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geoClientesDireccionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeoClientesDireccionDto: UpdateGeoClientesDireccionDto) {
    return this.geoClientesDireccionService.update(+id, updateGeoClientesDireccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geoClientesDireccionService.remove(+id);
  }
}
