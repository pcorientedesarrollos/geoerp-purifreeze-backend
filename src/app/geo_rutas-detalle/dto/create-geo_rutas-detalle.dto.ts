import { IsDateString, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGeoRutaDetalleDto {
  @IsInt()
  @IsNotEmpty()
  readonly idRuta: number;

  @IsNumber({}, { message: 'La latitud debe ser un número.' })
  @IsNotEmpty({ message: 'La latitud es requerida.' })
  readonly latitud: number;

  @IsNumber({}, { message: 'La longitud debe ser un número.' })
  @IsNotEmpty({ message: 'La longitud es requerida.' })
  readonly longitud: number;

  @IsDateString({}, { message: 'fecha_hora debe ser una fecha válida.' })
  @IsNotEmpty({ message: 'fecha_hora es requerida.' })
  readonly fecha_hora: Date;
}