import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGeoRutaDetalleDto {
  @IsInt({ message: 'El idRuta debe ser un número entero.' })
  @IsNotEmpty({ message: 'El idRuta es requerido.' })
  idRuta: number;

  @IsInt({ message: 'El idCliente debe ser un número entero.' })
  @IsNotEmpty({ message: 'El idCliente es requerido.' })
  idCliente: number; // Campo añadido

  @IsNumber({}, { message: 'La latitud debe ser un número.' })
  @IsNotEmpty({ message: 'La latitud es requerida.' })
  latitud: number;

  @IsNumber({}, { message: 'La longitud debe ser un número.' })
  @IsNotEmpty({ message: 'La longitud es requerida.' })
  longitud: number;

  @IsInt({ message: 'El status debe ser un número entero.' })
  @IsNotEmpty({ message: 'El status es requerido.' })
  status: number; // Campo añadido para que tomen en cuenta brous
}
