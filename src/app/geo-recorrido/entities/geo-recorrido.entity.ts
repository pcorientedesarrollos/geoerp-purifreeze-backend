// src/app/geo-recorrido/entities/geo-recorrido.entity.ts

import { GeoRutaDetalleEntity } from 'src/app/geo_rutas-detalle/entities/geo_rutas-detalle.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('geo_recorrido')
export class GeoRecorridoEntity {
  @PrimaryGeneratedColumn()
  idRecorrido: number;

  @Column({ type: 'int' })
  idRutaDetalle: number;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitud: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitud: number;

  @CreateDateColumn({ type: 'timestamp', name: 'fechaHora' })
  fechaHora: Date;

  // Relación: Muchos puntos de recorrido pueden pertenecer a UN detalle de ruta.
  @ManyToOne(
    () => GeoRutaDetalleEntity,
    // --- CORREGIR ESTA LÍNEA ---
    (rutaDetalle) => rutaDetalle.recorridos, // Antes decía 'rutaDetalle.detalles'
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'idRutaDetalle' })
  rutaDetalle: GeoRutaDetalleEntity;
}
