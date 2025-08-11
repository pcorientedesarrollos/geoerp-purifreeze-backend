//: src/app/geo_rutas/geo_rutas.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoRutasService } from './geo_rutas.service';
import { GeoRutasController } from './geo_rutas.controller';
import { GeoRutaEntity } from './entities/geo_ruta.entity';

// ======================= ¡ESTAS SON LAS IMPORTACIONES QUE FALTABAN! =======================
import { GeoRecorridoEntity } from '../geo-recorrido/entities/geo-recorrido.entity';
import { GeoUnidadesTransporte } from '../geo_unidades-transporte/entities/geo_unidades-transporte.entity';
// =======================================================================================

@Module({
  imports: [
    // ======================= ¡ESTA ES LA CORRECCIÓN CLAVE! =======================
    // Ahora, este módulo tiene acceso no solo a su propia entidad, sino también
    // a las entidades de Recorrido y Unidad, permitiendo inyectar sus repositorios.
    TypeOrmModule.forFeature([
      GeoRutaEntity,
      GeoRecorridoEntity,
      GeoUnidadesTransporte,
    ]),
    // =======================================================================================
  ],
  controllers: [GeoRutasController],
  providers: [GeoRutasService],
})
export class GeoRutasModule {}
