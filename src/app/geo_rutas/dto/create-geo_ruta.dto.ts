// src/geo_rutas/dto/create-geo_ruta.dto.ts

import { Type } from 'class-transformer';
import {
  IsInt,
  IsString,
  IsDateString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { CreateGeoRutasParadaDto } from 'src/app/geo-rutas-paradas/dto/create-geo-rutas-parada.dto';

export class CreateGeoRutaDto {
  @IsInt()
  @IsNotEmpty()
  idUsuario: number;

  @IsInt()
  @IsNotEmpty()
  idUnidadTransporte: number;

  @IsInt()
  @IsNotEmpty()
  idTipoServicio: number;

  @IsDateString()
  @IsNotEmpty()
  fecha_hora: Date;

  // CORREGIDO: El nombre de la propiedad ahora es 'kmlInicial'
  @IsString()
  @IsOptional() // Se hace opcional para coincidir con la entidad (nullable: true)
  kmlInicial?: string;

  @IsArray()
  @ValidateNested({ each: true })
  // CORREGIDO: El tipo debe ser el DTO de Parada
  @Type(() => CreateGeoRutasParadaDto)
  paradas: CreateGeoRutasParadaDto[];
}
