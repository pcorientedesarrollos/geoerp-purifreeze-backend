import { Injectable } from '@nestjs/common';
import { CreateGeoStatusDto } from './dto/create-geo_status.dto';
import { UpdateGeoStatusDto } from './dto/update-geo_status.dto';
import { GeoStatus } from './entities/geo_status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GeoStatusService {

  constructor(
  @InjectRepository(GeoStatus)
    private readonly geostatus: Repository<GeoStatus>,
  ){}

  findAll(): Promise<GeoStatus[]> {
    return this.geostatus.find();
  }

}
