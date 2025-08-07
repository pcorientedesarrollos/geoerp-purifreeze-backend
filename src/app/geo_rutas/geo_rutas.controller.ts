// src/geo_rutas/geo_rutas.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { GeoRutasService } from './geo_rutas.service';
import { CreateGeoRutaDto } from './dto/create-geo_ruta.dto';
import { UpdateGeoRutaDto } from './dto/update-geo_ruta.dto';
import { RutaStatus } from './entities/geo_ruta.entity';

@Controller('geo-rutas')
export class GeoRutasController {
  constructor(private readonly geoRutasService: GeoRutasService) {}

  @Get('resumen')
  getResumenRutas() {
    return this.geoRutasService.obtenerResumenRutas();
  }

  @Post()
  create(@Body() createGeoRutaDto: CreateGeoRutaDto) {
    return this.geoRutasService.create(createGeoRutaDto);
  }

  @Get()
  findAll() {
    return this.geoRutasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.geoRutasService.findOne(id);
  }

  //ENDPOINTS PARA LA APP DE FLUTTER

  @Patch(':id/iniciar')
  async iniciarRuta(@Param('id', ParseIntPipe) id: number) {
    return this.geoRutasService.update(id, { status: RutaStatus.EN_CURSO });
  }

  @Patch(':id/finalizar')
  async finalizarRuta(@Param('id', ParseIntPipe) id: number) {
    return this.geoRutasService.update(id, { status: RutaStatus.FINALIZADA });
  }

  /** ESTE ES EL NUEVO GET PARA QUE SE PUEDAN OPTENER
   * Expone la funcionalidad para obtener los clientes geolocalizados de una ruta.
   * Se accede a través de GET /api/geo-rutas/:id/clientes-geolocalizados
   */
  @Get(':id/clientes-geolocalizados')
  getClientesGeolocalizados(@Param('id', ParseIntPipe) id: number) {
    return this.geoRutasService.findClientesGeolocalizadosParaRuta(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGeoRutaDto: UpdateGeoRutaDto,
  ) {
    return this.geoRutasService.update(id, updateGeoRutaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.geoRutasService.remove(id);
  }
}
