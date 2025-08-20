// Contenido Final para: src/app/geo_rutas/dto/update-geo_ruta.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsInt, IsOptional } from 'class-validator'; 
import { CreateGeoRutaDto } from './create-geo_ruta.dto';

// PartialType hace que todas las propiedades de CreateGeoRutaDto sean opcionales.
export class UpdateGeoRutaDto extends PartialType(CreateGeoRutaDto) {
  // ===================== ¡AÑADIR ESTA NUEVA PROPIEDAD! =====================
  /**
   * Se añade la propiedad 'statusRuta' para permitir la actualización del estado.
   * @IsEnum valida que el valor sea uno de los definidos en el enum RutaStatus.
   * @IsOptional permite que este campo no sea obligatorio en todas las peticiones PATCH.
   */
  // @IsOptional()
  // @IsEnum(RutaStatus)
  // statusRuta?: RutaStatus;


    /**
   * Propiedad para almacenar el estatus como un número entero.
   * @IsOptional() permite que este campo sea opcional en la actualización.
   * @IsInt() asegura que el valor recibido sea un número entero.
   */
  @IsOptional()
  @IsInt()
  idEstatus?: number;


  // =====================================================================
}
