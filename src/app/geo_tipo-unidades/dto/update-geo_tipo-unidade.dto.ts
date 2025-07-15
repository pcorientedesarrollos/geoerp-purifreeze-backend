import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoTipoUnidadeDto } from './create-geo_tipo-unidade.dto';

export class UpdateGeoTipoUnidadeDto extends PartialType(CreateGeoTipoUnidadeDto) {}
