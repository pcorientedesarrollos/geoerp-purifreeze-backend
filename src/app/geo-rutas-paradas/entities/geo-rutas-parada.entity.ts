// Corregido para que apunte al archivo local
import { GeoRutaEntity } from 'src/app/geo_rutas/entities/geo_ruta.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('geo_rutasParadas') // El nombre de la tabla es correcto
export class GeoRutasParadaEntity {
  // Cambiado el nombre de la clase por convención
  @PrimaryGeneratedColumn()
  idParada: number;

  @Column()
  idRuta: number;

  @Column()
  idCliente: number;

  @Column()
  idSucursal: number;

  @Column()
  idTipoServicio: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  direccion: string;

  @Column({ type: 'text', nullable: true })
  notas: string;

  // La relación es correcta. Apunta a la propiedad 'paradas' en GeoRutaEntity.
  @ManyToOne(() => GeoRutaEntity, (ruta) => ruta.paradas)
  @JoinColumn({ name: 'idRuta' })
  ruta: GeoRutaEntity;
}
