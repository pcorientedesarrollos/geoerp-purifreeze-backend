import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoServicioDto } from './create-geo_servicio.dto';

export class UpdateGeoServicioDto extends PartialType(CreateGeoServicioDto) {}
