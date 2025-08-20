
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GeoRutasService } from './geo_rutas.service';
import { CreateGeoRutaDto } from './dto/create-geo_ruta.dto';
import { UpdateGeoRutaDto } from './dto/update-geo_ruta.dto';

// La importación de 'RutaStatus' ya no es necesaria.

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

  @Get('resumen')
  getResumenRutas() {
    return this.geoRutasService.obtenerResumenRutas(); 
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.geoRutasService.findOne(id);
  }

  @Get(':id/clientes-geolocalizados')
  getClientesGeolocalizados(@Param('id', ParseIntPipe) id: number) {
    return this.geoRutasService.findClientesGeolocalizadosParaRuta(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGeoRutaDto: UpdateGeoRutaDto) {
    return this.geoRutasService.update(id, updateGeoRutaDto);
  }

  @Patch(':id/iniciar')
  iniciarRuta(@Param('id', ParseIntPipe) id: number) {
    // Llama al método dedicado en el servicio para mayor claridad
    return this.geoRutasService.iniciarRuta(id);
  }

  @Patch(':id/finalizar')
  finalizarRuta(@Param('id', ParseIntPipe) id: number) {
    return this.geoRutasService.finalizarYCalcularRuta(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.geoRutasService.remove(id);
  }
}