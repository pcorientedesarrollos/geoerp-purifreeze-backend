import { Test, TestingModule } from '@nestjs/testing';
import { GeoServiciosController } from './geo_servicios.controller';
import { GeoServiciosService } from './geo_servicios.service';

describe('GeoServiciosController', () => {
  let controller: GeoServiciosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoServiciosController],
      providers: [GeoServiciosService],
    }).compile();

    controller = module.get<GeoServiciosController>(GeoServiciosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
