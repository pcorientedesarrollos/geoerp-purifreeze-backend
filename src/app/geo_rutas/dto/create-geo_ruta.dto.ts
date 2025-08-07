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
  IsEnum,
} from 'class-validator';

import { RutaStatus } from '../entities/geo_ruta.entity';

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

  @IsEnum(RutaStatus)
  @IsOptional()
  status?: RutaStatus;
}
