import { Test, TestingModule } from '@nestjs/testing';
import { GeoClientesService } from './geo_clientes.service';

describe('GeoClientesService', () => {
  let service: GeoClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoClientesService],
    }).compile();

    service = module.get<GeoClientesService>(GeoClientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
