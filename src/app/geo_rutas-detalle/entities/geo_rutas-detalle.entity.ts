// src/app/geo_rutas-detalle/entities/geo_rutas-detalle.entity.ts

import { GeoRutaEntity } from 'src/app/geo_rutas/entities/geo_ruta.entity';
import { GeoRecorridoEntity } from 'src/app/geo-recorrido/entities/geo-recorrido.entity'; //
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('geo_rutasDetalle')
export class GeoRutaDetalleEntity {
  @PrimaryGeneratedColumn()
  idRutaDetalle: number;

  @Column({ type: 'int' })
  idRuta: number;

  @Column({ type: 'int' })
  idCliente: number;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitud: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitud: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_hora: Date;

  @Column({ type: 'smallint' })
  status: number;

  // Relación: Muchos detalles pertenecen a UNA ruta.
  @ManyToOne(() => GeoRutaEntity, (ruta) => ruta.detalles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idRuta' })
  ruta: GeoRutaEntity;

  // Un detalle de ruta puede tener muchos puntos de recorrido.
  @OneToMany(() => GeoRecorridoEntity, (recorrido) => recorrido.rutaDetalle)
  recorridos: GeoRecorridoEntity[];
}
