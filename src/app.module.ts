import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeoRutasModule } from './app/geo_rutas/geo_rutas.module';

@Module({
  imports: [GeoRutasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
