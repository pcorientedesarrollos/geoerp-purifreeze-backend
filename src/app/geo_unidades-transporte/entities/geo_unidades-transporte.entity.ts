import { GeoTipoUnidade } from 'src/app/geo_tipo-unidades/entities/geo_tipo-unidade.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('geo_unidadTransporte')
export class GeoUnidadesTransporte {
  @PrimaryGeneratedColumn()
  idUnidadTransporte: number;

  @Column()
  idTipoUnidad: number;

  @ManyToOne(() => GeoTipoUnidade)
  @JoinColumn({ name: 'idTipoUnidad' })
  tipoUnidad: GeoTipoUnidade;

  @Column()
  nombreUnidad: string;

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

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  rendimientoKmL: number;
}
