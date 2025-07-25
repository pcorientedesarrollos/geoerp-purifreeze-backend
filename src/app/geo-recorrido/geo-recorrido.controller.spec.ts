import { Test, TestingModule } from '@nestjs/testing';
import { GeoRecorridoController } from './geo-recorrido.controller';
import { GeoRecorridoService } from './geo-recorrido.service';

describe('GeoRecorridoController', () => {
  let controller: GeoRecorridoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoRecorridoController],
      providers: [GeoRecorridoService],
    }).compile();

    controller = module.get<GeoRecorridoController>(GeoRecorridoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
