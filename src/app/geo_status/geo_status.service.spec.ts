import { Test, TestingModule } from '@nestjs/testing';
import { GeoStatusService } from './geo_status.service';

describe('GeoStatusService', () => {
  let service: GeoStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoStatusService],
    }).compile();

    service = module.get<GeoStatusService>(GeoStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
