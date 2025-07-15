import { Test, TestingModule } from '@nestjs/testing';
import { GeoRutasDetalleController } from './geo_rutas-detalle.controller';
import { GeoRutasDetalleService } from './geo_rutas-detalle.service';

describe('GeoRutasDetalleController', () => {
  let controller: GeoRutasDetalleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoRutasDetalleController],
      providers: [GeoRutasDetalleService],
    }).compile();

    controller = module.get<GeoRutasDetalleController>(GeoRutasDetalleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
