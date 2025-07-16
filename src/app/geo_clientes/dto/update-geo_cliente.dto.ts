import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoClienteDto } from './create-geo_cliente.dto';

export class UpdateGeoClienteDto extends PartialType(CreateGeoClienteDto) {}
