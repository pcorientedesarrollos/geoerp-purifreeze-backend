// Contenido Final y Correcto para: src/app/geo_rutas/dto/create-geo_ruta.dto.ts

import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';

// Ya no es necesario importar RutaStatus aquí.

export class CreateGeoRutaDto {
  @IsInt()
  @IsNotEmpty()
  idUsuario: number;

  @IsInt()
  @IsNotEmpty()
  idUnidadTransporte: number;

  @IsString()
  @IsOptional()
  kmInicial?: string;

    @IsOptional()
  @IsInt()
  idEstatus?: number;

  // La propiedad 'statusRuta' ha sido eliminada de aquí intencionalmente.
  // El estado inicial 'PLANEADA' se asignará por defecto en la base de datos
  // al momento de la creación, lo cual es una práctica más segura.
}
