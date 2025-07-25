import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoRecorridoDto } from './create-geo-recorrido.dto';

export class UpdateGeoRecorridoDto extends PartialType(CreateGeoRecorridoDto) {}
