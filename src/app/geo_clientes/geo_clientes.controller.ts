import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GeoClientesService } from './geo_clientes.service';
import { CreateGeoClienteDto } from './dto/create-geo_cliente.dto';
import { UpdateGeoClienteDto } from './dto/update-geo_cliente.dto';

@Controller('geo-clientes')
export class GeoClientesController {
  constructor(private readonly geoClientesService: GeoClientesService) {}

  @Post()
  create(@Body() createGeoClienteDto: CreateGeoClienteDto) {
    return this.geoClientesService.create(createGeoClienteDto);
  }

  @Get()
  findAll() {
    return this.geoClientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geoClientesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGeoClienteDto: UpdateGeoClienteDto,
  ) {
    return this.geoClientesService.update(+id, updateGeoClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geoClientesService.remove(+id);
  }
}
