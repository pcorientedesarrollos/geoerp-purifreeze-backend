import { Test, TestingModule } from '@nestjs/testing';
import { GeoTipoUnidadesController } from './geo_tipo-unidades.controller';
import { GeoTipoUnidadesService } from './geo_tipo-unidades.service';

describe('GeoTipoUnidadesController', () => {
  let controller: GeoTipoUnidadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoTipoUnidadesController],
      providers: [GeoTipoUnidadesService],
    }).compile();

    controller = module.get<GeoTipoUnidadesController>(GeoTipoUnidadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
