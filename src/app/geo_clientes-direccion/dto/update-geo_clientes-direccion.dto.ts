import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoClientesDireccionDto } from './create-geo_clientes-direccion.dto';

export class UpdateGeoClientesDireccionDto extends PartialType(CreateGeoClientesDireccionDto) {}
