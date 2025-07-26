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
  idRuta: number; // CORREGIDO

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitud: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitud: number;

  @CreateDateColumn({ type: 'timestamp', name: 'fechaHora' })
  fechaHora: Date;

  @ManyToOne(
    () => GeoRutaDetalleEntity,
    (rutaDetalle) => rutaDetalle.recorridos,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'idRuta' }) // CORREGIDO
  rutaDetalle: GeoRutaDetalleEntity;
}
