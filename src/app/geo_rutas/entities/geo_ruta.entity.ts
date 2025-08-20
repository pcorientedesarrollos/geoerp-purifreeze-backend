
import { GeoRutaDetalleEntity } from 'src/app/geo_rutas-detalle/entities/geo_rutas-detalle.entity';
import { GeoUnidadesTransporte } from 'src/app/geo_unidades-transporte/entities/geo_unidades-transporte.entity';
import { User } from 'src/app/users/entities/user.entity';
import { GeoStatus } from 'src/app/geo_status/entities/geo_status.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('geo_rutas')
export class GeoRutaEntity {
  @PrimaryGeneratedColumn()
  idRuta: number;

  @Column({ type: 'int' })
  idUsuario: number;

  @Column({ name: 'idUnidadTransporte', type: 'int' })
  idUnidadTransporte: number;

  @CreateDateColumn({ name: 'fecha_hora', type: 'datetime' })
  fechaHora: Date;

  @Column({ name: 'kmInicial', type: 'varchar', length: 255, nullable: true })
  kmInicial: string;

  // <-- ¡CAMBIO IMPORTANTE! La columna 'statusRuta' ha sido eliminada de la entidad.

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  distanciaTotalKm: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  consumoEstimadoLitros: number;

  @Column({ type: 'int', nullable: true })
  duracionMinutos: number;

  @Column({ type: 'int', default: 1 }) // El estado por defecto será 1 ('Confirmado' o 'Planeada')
  idEstatus: number;

  // --- RELACIONES ---

  @OneToMany(() => GeoRutaDetalleEntity, (detalle) => detalle.ruta)
  detalles: GeoRutaDetalleEntity[];

  @ManyToOne(() => GeoUnidadesTransporte, { eager: true })
  @JoinColumn({ name: 'idUnidadTransporte' })
  unidadTransporte: GeoUnidadesTransporte;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'idUsuario' })
  usuario: User;

  @ManyToOne(() => GeoStatus, { eager: true })
  @JoinColumn({ name: 'idEstatus' })
  status: GeoStatus;
}