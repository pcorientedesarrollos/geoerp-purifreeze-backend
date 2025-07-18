import { IsDateString, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGeoRutaDetalleDto {
  @IsInt()
  @IsNotEmpty()
  idRuta: number;

  @IsNumber({}, { message: 'La latitud debe ser un número.' })
  @IsNotEmpty({ message: 'La latitud es requerida.' })
  latitud: number;

  @IsNumber({}, { message: 'La longitud debe ser un número.' })
  @IsNotEmpty({ message: 'La longitud es requerida.' })
  longitud: number;

  @IsDateString({}, { message: 'fecha_hora debe ser una fecha válida.' })
  @IsNotEmpty({ message: 'fecha_hora es requerida.' })
  fecha_hora: Date;
}