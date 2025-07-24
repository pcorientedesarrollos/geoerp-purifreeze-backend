// src/app/geo-recorrido/dto/create-geo-recorrido.dto.ts

import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGeoRecorridoDto {
  @IsInt({ message: 'El idRutaDetalle debe ser un número entero.' })
  @IsNotEmpty({ message: 'El idRutaDetalle es requerido.' })
  idRutaDetalle: number;

  @IsNumber({}, { message: 'La latitud debe ser un número.' })
  @IsNotEmpty({ message: 'La latitud es requerida.' })
  latitud: number;

  @IsNumber({}, { message: 'La longitud debe ser un número.' })
  @IsNotEmpty({ message: 'La longitud es requerida.' })
  longitud: number;
}
