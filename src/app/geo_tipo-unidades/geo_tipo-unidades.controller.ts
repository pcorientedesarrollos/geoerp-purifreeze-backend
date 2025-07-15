import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeoTipoUnidadesService } from './geo_tipo-unidades.service';
import { CreateGeoTipoUnidadeDto } from './dto/create-geo_tipo-unidade.dto';
import { UpdateGeoTipoUnidadeDto } from './dto/update-geo_tipo-unidade.dto';

@Controller('geo-tipo-unidades')
export class GeoTipoUnidadesController {
  constructor(private readonly geoTipoUnidadesService: GeoTipoUnidadesService) {}

  @Post()
  create(@Body() createGeoTipoUnidadeDto: CreateGeoTipoUnidadeDto) {
    return this.geoTipoUnidadesService.create(createGeoTipoUnidadeDto);
  }

  @Get()
  findAll() {
    return this.geoTipoUnidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geoTipoUnidadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeoTipoUnidadeDto: UpdateGeoTipoUnidadeDto) {
    return this.geoTipoUnidadesService.update(+id, updateGeoTipoUnidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geoTipoUnidadesService.remove(+id);
  }
}
