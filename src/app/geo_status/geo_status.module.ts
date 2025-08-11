import { Module } from '@nestjs/common';
import { GeoStatusService } from './geo_status.service';
import { GeoStatusController } from './geo_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoStatus } from './entities/geo_status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GeoStatus])
  ],
  controllers: [GeoStatusController],
  providers: [GeoStatusService],
})
export class GeoStatusModule {}
