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

  @Column({ type: 'int' })
  idCliente: number;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitud: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitud: number;

  // : Cambiae de 'datetime' a 'timestamp' para coincidir con la tabla cualquier cosa modifiquen.
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_hora: Date;

  //  Cambie de 'int' a 'smallint' para coincidir con la tabla.
  @Column({ type: 'smallint' })
  status: number;

  //: Muchos detalles pertenecen a UNA ruta.
  @ManyToOne(() => GeoRutaEntity, (ruta) => ruta.detalles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idRuta' })
  ruta: GeoRutaEntity;
}
