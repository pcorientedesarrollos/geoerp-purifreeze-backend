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

export class CreateGeoRutaDto {
  @IsInt()
  @IsNotEmpty()
  idUsuario: number;

  @IsInt()
  @IsNotEmpty()
  idUnidadTransporte: number;


  // CORREGIDO: El nombre de la propiedad ahora es 'kmlInicial'
  @IsString()
  @IsOptional() // Se hace opcional para coincidir con la entidad (nullable: true)
  kmInicial?: string;

}
