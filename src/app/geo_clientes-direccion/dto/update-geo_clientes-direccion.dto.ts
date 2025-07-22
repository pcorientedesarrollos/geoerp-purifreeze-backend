import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoClienteDireccionDto } from './create-geo_clientes-direccion.dto';

export class UpdateGeoClienteDireccionDto extends PartialType(CreateGeoClienteDireccionDto) {}