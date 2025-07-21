import { Test, TestingModule } from '@nestjs/testing';
import { GeoClientesController } from './geo_clientes.controller';
import { GeoClientesService } from './geo_clientes.service';

describe('GeoClientesController', () => {
  let controller: GeoClientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoClientesController],
      providers: [GeoClientesService],
    }).compile();

    controller = module.get<GeoClientesController>(GeoClientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
