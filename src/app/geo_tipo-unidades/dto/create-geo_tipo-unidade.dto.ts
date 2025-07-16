import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateGeoTipoUnidadeDto {
  @IsString()
  nombreTipoUnidad: string;

  @IsString()
  tipoCombustible: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsInt()
  activo?: number;
}
