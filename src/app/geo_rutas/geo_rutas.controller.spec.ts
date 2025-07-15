import { Test, TestingModule } from '@nestjs/testing';
import { GeoRutasController } from './geo_rutas.controller';
import { GeoRutasService } from './geo_rutas.service';

describe('GeoRutasController', () => {
  let controller: GeoRutasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoRutasController],
      providers: [GeoRutasService],
    }).compile();

    controller = module.get<GeoRutasController>(GeoRutasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
