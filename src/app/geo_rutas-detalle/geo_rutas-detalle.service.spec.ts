import { Test, TestingModule } from '@nestjs/testing';
import { GeoRutasDetalleService } from './geo_rutas-detalle.service';

describe('GeoRutasDetalleService', () => {
  let service: GeoRutasDetalleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoRutasDetalleService],
    }).compile();

    service = module.get<GeoRutasDetalleService>(GeoRutasDetalleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
