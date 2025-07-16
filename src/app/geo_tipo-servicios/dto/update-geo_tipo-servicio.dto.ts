import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoTipoServicioDto } from './create-geo_tipo-servicio.dto';

export class UpdateGeoTipoServicioDto extends PartialType(CreateGeoTipoServicioDto) {}