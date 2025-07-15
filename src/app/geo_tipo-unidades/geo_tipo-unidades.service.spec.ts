import { Test, TestingModule } from '@nestjs/testing';
import { GeoTipoUnidadesService } from './geo_tipo-unidades.service';

describe('GeoTipoUnidadesService', () => {
  let service: GeoTipoUnidadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoTipoUnidadesService],
    }).compile();

    service = module.get<GeoTipoUnidadesService>(GeoTipoUnidadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
