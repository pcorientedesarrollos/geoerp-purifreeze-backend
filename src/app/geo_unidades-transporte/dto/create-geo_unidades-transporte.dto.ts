import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateGeoUnidadesTransporteDto {
  @IsInt()
  @IsNotEmpty()
  idTipoUnidad: number;

  @IsString()
  nombreUnidad: string;

  @IsString()
  placaUnidad: string;

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

  // ¡NUEVA PROPIEDAD!
  @IsOptional()
  @IsNumber()
  @Min(0)
  rendimientoKmL?: number;
}
