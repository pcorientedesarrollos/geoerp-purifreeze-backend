import { GeoRutaEntity } from 'src/app/geo_rutas/entities/geo_ruta.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('geo_rutasDetalle')
export class GeoRutaDetalleEntity {
  @PrimaryGeneratedColumn()
  idRutaDetalle: number;

  @Column({ type: 'int' })
  idRuta: number;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitud: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitud: number;

  @Column({ type: 'datetime' })
  fecha_hora: Date;

  // Relación: Muchos detalles pertenecen a UNA ruta.
  @ManyToOne(() => GeoRutaEntity, (ruta) => ruta.detalles, {
    onDelete: 'CASCADE', // Si se borra la ruta, se borran sus detalles.
  })
  @JoinColumn({ name: 'idRuta' }) // Especifica que la columna 'idRuta' es la clave foránea.
  ruta: GeoRutaEntity;
}
