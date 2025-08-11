import { GeoTipoUnidade } from 'src/app/geo_tipo-unidades/entities/geo_tipo-unidade.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('geo_unidadTransporte')
export class GeoUnidadesTransporte {
  @PrimaryGeneratedColumn()
  idUnidadTransporte: number;

  @Column()
  idTipoUnidad: number;

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

  @Column()
  unidadActiva: number;

  @Column({ default: 1 })
  activo: number;

  // ¡NUEVA COLUMNA!
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  rendimientoKmL: number;

  @ManyToOne(() => GeoTipoUnidade)
  @JoinColumn({ name: 'idTipoUnidad' })
  tipoUnidad: GeoTipoUnidade;
}
