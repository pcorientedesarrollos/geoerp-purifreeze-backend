import { Test, TestingModule } from '@nestjs/testing';
import { GeoRecorridoService } from './geo-recorrido.service';

describe('GeoRecorridoService', () => {
  let service: GeoRecorridoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoRecorridoService],
    }).compile();

    service = module.get<GeoRecorridoService>(GeoRecorridoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
