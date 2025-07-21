import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGeoClienteDireccionDto {
  @IsInt({ message: 'El idCliente debe ser un número entero.' })
  @IsNotEmpty({ message: 'El idCliente es requerido.' })
  readonly idCliente: number;

  @IsString()
  @IsNotEmpty({ message: 'La dirección es requerida.' })
  @MaxLength(255)
  readonly direccion: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre de la sucursal es requerido.' })
  @MaxLength(100)
  readonly nombreSucursal: string;
}