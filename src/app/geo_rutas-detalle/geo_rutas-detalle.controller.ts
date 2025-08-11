
// src/app/geo-rutas-detalle/geo-rutas-detalle.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe, // Valida que el 'id' en la URL sea un número
} from '@nestjs/common';
import { CreateGeoRutaDetalleDto } from './dto/create-geo_rutas-detalle.dto';
import { UpdateGeoRutaDetalleDto } from './dto/update-geo_rutas-detalle.dto';
import { GeoRutasDetalleService } from './geo_rutas-detalle.service';


@Controller('geo-rutas-detalle')
export class GeoRutasDetalleController {
  constructor(
    private readonly geoRutasDetalleService: GeoRutasDetalleService,
  ) {}


  @Get('servicios-disponibles')
  findServiciosDisponibles() {
    return this.geoRutasDetalleService.findServiciosDisponiblesParaRuta();
  }


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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateGeoRutaDetalleDto,
  ) {
    return this.geoRutasDetalleService.update(id, updateDto);
  }

    @Post('guardar')
  async guardar(@Body() dto: CreateGeoRutaDetalleDto) {
    console.log('pasa por el controlador');
    return this.geoRutasDetalleService.guardarCoordenada(dto);
  }


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.geoRutasDetalleService.remove(id);
  }

   @Get('coordenadas/:id')
    async coordenadas(@Param('id') id: number) {
      return this.geoRutasDetalleService.obtenerCoordenadas(Number(id));
    }
}