import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoRutaDetalleDto } from './create-geo_rutas-detalle.dto';

export class UpdateGeoRutaDetalleDto extends PartialType(CreateGeoRutaDetalleDto) {}