import { GeoTipoUnidade } from 'src/app/geo_tipo-unidades/entities/geo_tipo-unidade.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('geo_unidadesTransporte')
export class GeoUnidadesTransporte {
  @PrimaryGeneratedColumn()
  idUnidadTransporte: number;

  @Column()
  idTipoUnidad: number;

  @ManyToOne(() => GeoTipoUnidade)
  @JoinColumn({ name: 'idTipoUnidad' })
  tipoUnidad: GeoTipoUnidade;

  @Column()
  placaUnidad: string;

  @Column()
  nivUnidad: string;

  @Column()
  marcaUnidad: string;

  @Column()
  modeloUnidad: string;

  @Column({ default: 1 })
  unidadActiva: number;

  @Column({ default: 1 })
  activo: number;
}
