import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GeoRutasParadasService } from './geo-rutas-paradas.service';
import { CreateGeoRutasParadaDto } from './dto/create-geo-rutas-parada.dto';
import { UpdateGeoRutasParadaDto } from './dto/update-geo-rutas-parada.dto';

@Controller('geo-rutasParadas')
export class GeoRutasParadasController {
  constructor(
    private readonly geoRutasParadasService: GeoRutasParadasService,
  ) {}

  @Post()
  create(@Body() createGeoRutasParadaDto: CreateGeoRutasParadaDto) {
    return this.geoRutasParadasService.create(createGeoRutasParadaDto);
  }

  @Get()
  findAll() {
    return this.geoRutasParadasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geoRutasParadasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGeoRutasParadaDto: UpdateGeoRutasParadaDto,
  ) {
    return this.geoRutasParadasService.update(+id, updateGeoRutasParadaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geoRutasParadasService.remove(+id);
  }
}
