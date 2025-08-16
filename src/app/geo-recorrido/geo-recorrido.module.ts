// src/app/geo-recorrido/geo-recorrido.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoRecorridoEntity } from './entities/geo-recorrido.entity';
import { GeoRecorridoService } from './geo-recorrido.service';
import { GeoRecorridoController } from './geo-recorrido.controller';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([GeoRecorridoEntity]), EventsModule],
  controllers: [GeoRecorridoController],
  providers: [GeoRecorridoService],
})
export class GeoRecorridoModule {}
