import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoRutaDto } from './create-geo_ruta.dto';

// PartialType hace que todas las propiedades de CreateGeoRutaDto sean opcionales
export class UpdateGeoRutaDto extends PartialType(CreateGeoRutaDto) {}