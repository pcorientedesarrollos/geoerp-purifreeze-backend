import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('geo_tipoServicios') // Nombre de la tabla en la base de datos
export class GeoTipoServicioEntity {
  @PrimaryGeneratedColumn()
  idTipoServicio: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ type: 'int', default: 1 })
  estado: number;
}