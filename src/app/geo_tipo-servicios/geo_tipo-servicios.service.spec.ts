import { Test, TestingModule } from '@nestjs/testing';
import { GeoTipoServiciosService } from './geo_tipo-servicios.service';

describe('GeoTipoServiciosService', () => {
  let service: GeoTipoServiciosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoTipoServiciosService],
    }).compile();

    service = module.get<GeoTipoServiciosService>(GeoTipoServiciosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
