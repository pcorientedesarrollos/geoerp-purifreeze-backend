import { IsInt, IsString, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';

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
  @IsOptional()
  kmInicial?: string;
}

