import { Test, TestingModule } from '@nestjs/testing';
import { GeoClientesDireccionService } from './geo_clientes-direccion.service';

describe('GeoClientesDireccionService', () => {
  let service: GeoClientesDireccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoClientesDireccionService],
    }).compile();

    service = module.get<GeoClientesDireccionService>(GeoClientesDireccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
