// RUTA COMPLETA: src/app/geo_rutas/entities/geo_ruta.entity.ts

import { GeoRutaDetalleEntity } from 'src/app/geo_rutas-detalle/entities/geo_rutas-detalle.entity';
import { GeoUnidadesTransporte } from 'src/app/geo_unidades-transporte/entities/geo_unidades-transporte.entity';
import { User } from 'src/app/users/entities/user.entity'; // <-- ¡IMPORTACIÓN AÑADIDA!
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum RutaStatus {
  PLANEADA = 'PLANEADA',
  EN_CURSO = 'EN_CURSO',
  FINALIZADA = 'FINALIZADA',
  CANCELADA = 'CANCELADA',
  ELIMINADA = 'ELIMINADA'
}

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

  @Column({
    type: 'enum',
    enum: RutaStatus,
    default: RutaStatus.PLANEADA,
    name: 'statusRuta',
  })
  statusRuta: RutaStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  distanciaTotalKm: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  consumoEstimadoLitros: number;

  @Column({ type: 'int', nullable: true })
  duracionMinutos: number;

  @OneToMany(() => GeoRutaDetalleEntity, (detalle) => detalle.ruta)
  detalles: GeoRutaDetalleEntity[];

  @ManyToOne(() => GeoUnidadesTransporte)
  @JoinColumn({ name: 'idUnidadTransporte' })
  unidadTransporte: GeoUnidadesTransporte;

  // Esta relación permite que `findAll` cargue el objeto de usuario completo.
  @ManyToOne(() => User)
  @JoinColumn({ name: 'idUsuario' })
  usuario: User;
}
