// COPIA Y PEGA ESTE CONTENIDO COMPLETO

import { Expose } from 'class-transformer';
import { GeoRutaDetalleEntity } from 'src/app/geo_rutas-detalle/entities/geo_rutas-detalle.entity';
import { GeoUnidadesTransporte } from 'src/app/geo_unidades-transporte/entities/geo_unidades-transporte.entity';
import { User } from 'src/app/users/entities/user.entity';
import { GeoStatus } from 'src/app/geo_status/entities/geo_status.entity';
import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  OneToMany, ManyToOne, JoinColumn,
} from 'typeorm';

@Entity('geo_rutas')
export class GeoRutaEntity {
  @Expose() @PrimaryGeneratedColumn() idRuta: number;
  @Expose() @Column({ type: 'int' }) idUsuario: number;
  @Expose() @Column({ name: 'idUnidadTransporte', type: 'int' }) idUnidadTransporte: number;
  @Expose() @CreateDateColumn({ name: 'fecha_hora', type: 'datetime' }) fechaHora: Date;
  @Expose() @Column({ name: 'kmInicial', type: 'varchar', length: 255, nullable: true }) kmInicial: string;
  @Expose() @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true }) distanciaTotalKm: number;
  @Expose() @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true }) consumoEstimadoLitros: number;
  @Expose() @Column({ type: 'int', nullable: true }) duracionMinutos: number;
  @Expose() @Column({ type: 'int', default: 1 }) idEstatus: number;

  @Expose()
  @OneToMany(() => GeoRutaDetalleEntity, (detalle) => detalle.ruta)
  detalles: GeoRutaDetalleEntity[];
  
  @Expose()
  @ManyToOne(() => GeoUnidadesTransporte, { eager: true })
  @JoinColumn({ name: 'idUnidadTransporte' })
  unidadTransporte: GeoUnidadesTransporte;
  
  @Expose()
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'idUsuario' })
  usuario: User;
  
  @Expose()
  @ManyToOne(() => GeoStatus, { eager: true })
  @JoinColumn({ name: 'idEstatus' })
  status: GeoStatus;
}