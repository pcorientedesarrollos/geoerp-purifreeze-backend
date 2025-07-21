import { Test, TestingModule } from '@nestjs/testing';
import { GeoRutasParadasController } from './geo-rutas-paradas.controller';
import { GeoRutasParadasService } from './geo-rutas-paradas.service';

describe('GeoRutasParadasController', () => {
  let controller: GeoRutasParadasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoRutasParadasController],
      providers: [GeoRutasParadasService],
    }).compile();

    controller = module.get<GeoRutasParadasController>(GeoRutasParadasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
