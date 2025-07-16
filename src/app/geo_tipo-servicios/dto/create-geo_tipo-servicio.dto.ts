import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateGeoTipoServicioDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  readonly nombre: string;

  @IsOptional() // El estado es opcional, por defecto será '1' según la entidad
  readonly estado?: number;
}