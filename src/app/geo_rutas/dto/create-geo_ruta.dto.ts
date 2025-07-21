import { Type } from 'class-transformer';
import {
  IsInt,
  IsString,
  IsDateString,
  IsOptional,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateGeoRutasParadaDto } from 'src/app/geo-rutas-paradas/dto/create-geo-rutas-parada.dto';

export class CreateGeoRutaDto {
  @IsInt()
  @IsNotEmpty()
  idUsuario: number;

  @IsInt()
  @IsNotEmpty()
  idCliente: number;

  @IsInt()
  @IsNotEmpty()
  idUnidadTransporte: number;

  @IsInt()
  @IsNotEmpty()
  idTipoServicio: number;

  @IsDateString()
  @IsNotEmpty()
  fecha_hora: Date;

  @IsString()
  @IsNotEmpty()
  kmInicial: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGeoRutaDto)
  paradas: CreateGeoRutasParadaDto[]; // <-- La propiedad se llama 'paradas'
}
