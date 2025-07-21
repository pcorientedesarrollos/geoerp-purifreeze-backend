import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateGeoUnidadesTransporteDto {
  @IsInt()
  idTipoUnidad: number;

  @IsString()
  placaUnidad: string;

  @IsString()
  nombreUnidad: string;

  @IsString()
  nivUnidad: string;

  @IsString()
  marcaUnidad: string;

  @IsString()
  modeloUnidad: string;

  @IsOptional()
  @IsInt()
  unidadActiva?: number;

  @IsOptional()
  @IsInt()
  activo?: number;
}
