import { Test, TestingModule } from '@nestjs/testing';
import { GeoUnidadesTransporteService } from './geo_unidades-transporte.service';

describe('GeoUnidadesTransporteService', () => {
  let service: GeoUnidadesTransporteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoUnidadesTransporteService],
    }).compile();

    service = module.get<GeoUnidadesTransporteService>(GeoUnidadesTransporteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
