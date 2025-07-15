import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoRutaDto } from './create-geo_ruta.dto';

export class UpdateGeoRutaDto extends PartialType(CreateGeoRutaDto) {}
