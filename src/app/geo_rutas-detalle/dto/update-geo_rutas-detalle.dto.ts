import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoRutasDetalleDto } from './create-geo_rutas-detalle.dto';

export class UpdateGeoRutasDetalleDto extends PartialType(CreateGeoRutasDetalleDto) {}
