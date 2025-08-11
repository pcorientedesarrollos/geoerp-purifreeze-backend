
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGeoRutaDetalleDto {
  @IsInt() @IsNotEmpty()
  idRuta: number;

  @IsInt() @IsNotEmpty()
  idServicioEquipo: number;

  // --- CORRECCIÓN CLAVE PARA EL ERROR 400 ---
  // Hacemos que estos campos sean opcionales.
  // Si existen, deben ser strings, pero si no existen, la validación pasará.
  @IsOptional()
  @IsString({ message: 'El noSerie debe ser una cadena de texto.' })
  noSerie?: string;

  // Hacemos este opcional también por seguridad, aunque casi siempre tendrá valor.
  @IsOptional()
  @IsString({ message: 'El nombreEquipo debe ser una cadena de texto.' })
  nombreEquipo?: string;

  @IsString() @IsNotEmpty()
  fechaServicio: string;

  @IsString() @IsNotEmpty()
  hora: string;

  @IsString() @IsNotEmpty()
  tipoServicio: string;

  @IsOptional() @IsString()
  descripcion?: string;

  @IsOptional() @IsString()
  observacionesServicio?: string;

  @IsInt() @IsNotEmpty()
  idContrato: number;

  @IsString() @IsNotEmpty()
  nombreComercio: string;

  @IsInt() @IsNotEmpty()
  status: number;
}