import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GeoClientesDireccionService } from './geo_clientes-direccion.service';
import { CreateGeoClienteDireccionDto } from './dto/create-geo_clientes-direccion.dto';
import { UpdateGeoClienteDireccionDto } from './dto/update-geo_clientes-direccion.dto';

@Controller('geo-clientes-direccion')
export class GeoClientesDireccionController {
  constructor(private readonly direccionService: GeoClientesDireccionService) {}

  @Post()
  create(@Body() createDto: CreateGeoClienteDireccionDto) {
    return this.direccionService.create(createDto);
  }

  @Get()
  findAll() {
    return this.direccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.direccionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateGeoClienteDireccionDto) {
    return this.direccionService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.direccionService.remove(id);
  }
}