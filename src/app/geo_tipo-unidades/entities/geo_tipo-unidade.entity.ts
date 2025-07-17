import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('geo_tipoUnidades')
export class GeoTipoUnidade {
  @PrimaryGeneratedColumn()
  idTipoUnidad: number;

  @Column()
  nombreTipoUnidad: string;

  @Column()
  tipoCombustible: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ default: 1 })
  activo: number;
}
