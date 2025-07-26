import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGeoRecorridoDto {
  @IsInt({ message: 'El idRuta debe ser un número entero.' })
  @IsNotEmpty({ message: 'El idRuta es requerido.' })
  idRuta: number; // CORREGIDO

  @IsNumber({}, { message: 'La latitud debe ser un número.' })
  @IsNotEmpty({ message: 'La latitud es requerida.' })
  latitud: number;

  @IsNumber({}, { message: 'La longitud debe ser un número.' })
  @IsNotEmpty({ message: 'La longitud es requerida.' })
  longitud: number;
}
