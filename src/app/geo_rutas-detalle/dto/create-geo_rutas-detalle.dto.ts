import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGeoRutaDetalleDto {
  @IsInt({ message: 'El idRuta debe ser un número entero.' })
  @IsNotEmpty({ message: 'El idRuta es requerido.' })
  idRuta: number;

  @IsInt({ message: 'El idServicioEquipo debe ser un número entero.' })
  @IsNotEmpty({ message: 'El idServicioEquipo es requerido.' })
  idServicioEquipo: number;

  @IsString({ message: 'El noSerie debe ser una cadena de texto.' })
  noSerie: string;  

  @IsString({ message: 'El nombreEquipo debe ser una cadena de texto.' })
  nombreEquipo: string;

  @IsString({ message: 'La fechaServicio debe ser una cadena de texto.' })
  fechaServicio: string;

  @IsString({ message: 'La horaServicio debe ser una cadena de texto.' })
  hora: string;

  @IsString({ message: 'El tipoServicio debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El tipoServicio es requerido.' })
  tipoServicio: string;

  @IsString({ message: 'La descripcion debe ser una cadena de texto.' })
  descripcion: string;

  @IsString({ message: 'Las observacionesServicio deben ser una cadena de texto.' })
  observacionesServicio: string;

  @IsInt({ message: 'El idContrato debe ser un número entero.' })
  @IsNotEmpty({ message: 'El idContrato es requerido.' })
  idContrato: number;

  @IsString({ message: 'El nombreComercio debe ser una cadena de texto.' })
  nombreComercio: string;


  @IsInt({ message: 'El status debe ser un número entero.' })
  @IsNotEmpty({ message: 'El status es requerido.' })
  status: number;
}
