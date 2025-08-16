// src/app/geo-recorrido/geo-recorrido.controller.ts

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
import { GeoRecorridoService } from './geo-recorrido.service';
import { CreateGeoRecorridoDto } from './dto/create-geo-recorrido.dto';
import { UpdateGeoRecorridoDto } from './dto/update-geo-recorrido.dto';
import { EventsGateway } from '../events/events.gateway';

@Controller('geo-recorrido')
export class GeoRecorridoController {
  constructor(
    private readonly geoRecorridoService: GeoRecorridoService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @Post()
  async create(@Body() createDto: CreateGeoRecorridoDto) {
    const nuevoPunto = await this.geoRecorridoService.create(createDto);
    this.eventsGateway.emitirNuevaCoordenada('nueva-coordenada', nuevoPunto);
    return nuevoPunto;
  }

  @Get()
  findAll() {
    return this.geoRecorridoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.geoRecorridoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateGeoRecorridoDto,
  ) {
    return this.geoRecorridoService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.geoRecorridoService.remove(id);
  }

  @Get('recorrido/:id')
  async recorrido(@Param('id') id: number) {
    return this.geoRecorridoService.obtenerrecorrido(Number(id));
  }
}
