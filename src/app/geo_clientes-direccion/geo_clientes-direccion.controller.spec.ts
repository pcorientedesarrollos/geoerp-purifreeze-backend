import { Test, TestingModule } from '@nestjs/testing';
import { GeoClientesDireccionController } from './geo_clientes-direccion.controller';
import { GeoClientesDireccionService } from './geo_clientes-direccion.service';

describe('GeoClientesDireccionController', () => {
  let controller: GeoClientesDireccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoClientesDireccionController],
      providers: [GeoClientesDireccionService],
    }).compile();

    controller = module.get<GeoClientesDireccionController>(GeoClientesDireccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
