import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeoUnidadesTransporteService } from './geo_unidades-transporte.service';
import { CreateGeoUnidadesTransporteDto } from './dto/create-geo_unidades-transporte.dto';
import { UpdateGeoUnidadesTransporteDto } from './dto/update-geo_unidades-transporte.dto';

@Controller('geo-unidades-transporte')
export class GeoUnidadesTransporteController {
  constructor(private readonly geoUnidadesTransporteService: GeoUnidadesTransporteService) {}

  @Post()
  create(@Body() createGeoUnidadesTransporteDto: CreateGeoUnidadesTransporteDto) {
    return this.geoUnidadesTransporteService.create(createGeoUnidadesTransporteDto);
  }

  @Get()
  findAll() {
    return this.geoUnidadesTransporteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geoUnidadesTransporteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeoUnidadesTransporteDto: UpdateGeoUnidadesTransporteDto) {
    return this.geoUnidadesTransporteService.update(+id, updateGeoUnidadesTransporteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geoUnidadesTransporteService.remove(+id);
  }
}
