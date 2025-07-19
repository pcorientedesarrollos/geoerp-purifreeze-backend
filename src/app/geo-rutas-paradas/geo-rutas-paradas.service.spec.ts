import { Test, TestingModule } from '@nestjs/testing';
import { GeoRutasParadasService } from './geo-rutas-paradas.service';

describe('GeoRutasParadasService', () => {
  let service: GeoRutasParadasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoRutasParadasService],
    }).compile();

    service = module.get<GeoRutasParadasService>(GeoRutasParadasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
