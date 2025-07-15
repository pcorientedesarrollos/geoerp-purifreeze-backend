import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoUnidadesTransporteDto } from './create-geo_unidades-transporte.dto';

export class UpdateGeoUnidadesTransporteDto extends PartialType(CreateGeoUnidadesTransporteDto) {}
