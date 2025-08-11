import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeoStatusService } from './geo_status.service';
import { CreateGeoStatusDto } from './dto/create-geo_status.dto';
import { UpdateGeoStatusDto } from './dto/update-geo_status.dto';

@Controller('geo-status')
export class GeoStatusController {
  constructor(private readonly geoStatusService: GeoStatusService) {}



  @Get()
  findAll() {
    return this.geoStatusService.findAll();
  }
}
