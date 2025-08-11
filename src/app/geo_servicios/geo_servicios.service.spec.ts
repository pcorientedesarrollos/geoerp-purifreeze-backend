import { Test, TestingModule } from '@nestjs/testing';
import { GeoServiciosService } from './geo_servicios.service';

describe('GeoServiciosService', () => {
  let service: GeoServiciosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoServiciosService],
    }).compile();

    service = module.get<GeoServiciosService>(GeoServiciosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
