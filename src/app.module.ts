import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeoUnidadTransporteModule } from './geo_unidad-transporte/geo_unidad-transporte.module';

@Module({
  imports: [GeoUnidadTransporteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
