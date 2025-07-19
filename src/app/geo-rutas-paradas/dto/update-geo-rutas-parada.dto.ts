import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoRutasParadaDto } from './create-geo-rutas-parada.dto';

export class UpdateGeoRutasParadaDto extends PartialType(CreateGeoRutasParadaDto) {}
