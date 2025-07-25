import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGeoRutasParadaDto {
  @IsInt()
  @IsNotEmpty()
  idCliente: number;

  @IsInt()
  idSucursal: number;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsInt()
  @IsNotEmpty()
  idTipoServicio: number;

  @IsString()
  @IsOptional()
  notas?: string;
}
