// Contenido Final para: src/app/geo_rutas/dto/update-geo_ruta.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateGeoRutaDto } from './create-geo_ruta.dto';
import { RutaStatus } from '../entities/geo_ruta.entity'; // ¡Importante importar el Enum!

// PartialType hace que todas las propiedades de CreateGeoRutaDto sean opcionales.
export class UpdateGeoRutaDto extends PartialType(CreateGeoRutaDto) {
  // ===================== ¡AÑADIR ESTA NUEVA PROPIEDAD! =====================
  /**
   * Se añade la propiedad 'statusRuta' para permitir la actualización del estado.
   * @IsEnum valida que el valor sea uno de los definidos en el enum RutaStatus.
   * @IsOptional permite que este campo no sea obligatorio en todas las peticiones PATCH.
   */
  @IsOptional()
  @IsEnum(RutaStatus)
  statusRuta?: RutaStatus;

  // =====================================================================
}
