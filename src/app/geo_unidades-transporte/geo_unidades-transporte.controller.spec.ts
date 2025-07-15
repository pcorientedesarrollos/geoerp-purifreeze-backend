import { Test, TestingModule } from '@nestjs/testing';
import { GeoUnidadesTransporteController } from './geo_unidades-transporte.controller';
import { GeoUnidadesTransporteService } from './geo_unidades-transporte.service';

describe('GeoUnidadesTransporteController', () => {
  let controller: GeoUnidadesTransporteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoUnidadesTransporteController],
      providers: [GeoUnidadesTransporteService],
    }).compile();

    controller = module.get<GeoUnidadesTransporteController>(GeoUnidadesTransporteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
