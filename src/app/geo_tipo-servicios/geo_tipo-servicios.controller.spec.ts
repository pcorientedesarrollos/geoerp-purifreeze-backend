import { Test, TestingModule } from '@nestjs/testing';
import { GeoTipoServiciosController } from './geo_tipo-servicios.controller';
import { GeoTipoServiciosService } from './geo_tipo-servicios.service';

describe('GeoTipoServiciosController', () => {
  let controller: GeoTipoServiciosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoTipoServiciosController],
      providers: [GeoTipoServiciosService],
    }).compile();

    controller = module.get<GeoTipoServiciosController>(GeoTipoServiciosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
