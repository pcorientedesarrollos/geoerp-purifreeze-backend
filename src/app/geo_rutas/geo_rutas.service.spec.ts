import { Test, TestingModule } from '@nestjs/testing';
import { GeoRutasService } from './geo_rutas.service';

describe('GeoRutasService', () => {
  let service: GeoRutasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoRutasService],
    }).compile();

    service = module.get<GeoRutasService>(GeoRutasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
