// src/geo_rutas/entities/geo_ruta.entity.ts

import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GeoRutaDetalleEntity } from '../../geo_rutas-detalle/entities/geo_rutas-detalle.entity';
import { GeoRutasParadaEntity } from 'src/app/geo-rutas-paradas/entities/geo-rutas-parada.entity';

@Entity('geo_rutas')
export class GeoRutaEntity {
  @PrimaryGeneratedColumn()
  idRuta: number;

  @Column({ type: 'int' })
  idUsuario: number;

  @Column({ type: 'int' })
  idUnidadTransporte: number;

  @Column({ type: 'datetime' })
  fecha_hora: Date;

  // Corregido para coincidir con el nombre de la columna en la BD, hacer pruebas por si acaso
  @Column({ type: 'varchar', length: 255, nullable: true })
  kmlInicial: string;

  @Column({ type: 'int' })
  idTipoServicio: number;

  // Relación con Paradas
  @OneToMany(() => GeoRutasParadaEntity, (parada) => parada.ruta, {
    cascade: true,
  })
  paradas: GeoRutasParadaEntity[];

  // Relación con Detalles (Rastreo GPS)
  @OneToMany(() => GeoRutaDetalleEntity, (detalle) => detalle.ruta)
  detalles: GeoRutaDetalleEntity[];
}
