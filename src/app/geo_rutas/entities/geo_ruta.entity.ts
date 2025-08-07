// En tu proyecto de NestJS: src/app/geo_rutas/entities/geo_ruta.entity.ts

import { GeoRutaDetalleEntity } from 'src/app/geo_rutas-detalle/entities/geo_rutas-detalle.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

//PARTE NUEVA TAMBIEN
export enum RutaStatus {
  PLANEADA = 'PLANEADA',
  EN_CURSO = 'EN_CURSO',
  FINALIZADA = 'FINALIZADA',
  CANCELADA = 'CANCELADA',
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

  // CORRECCIÓN: Asegurándonos de que el nombre de la columna sea 'kmInicial'
  @Column({ name: 'kmInicial', type: 'varchar', length: 255 })
  kmInicial: string;

  //ESTO LO AGREGUE Y ES NUEVO
  @Column({
    type: 'enum',
    enum: RutaStatus,
    default: RutaStatus.PLANEADA, // Por defecto, una ruta nueva está "Planeada"
  })
  status: RutaStatus;

  @OneToMany(() => GeoRutaDetalleEntity, (detalle) => detalle.ruta)
  detalles: GeoRutaDetalleEntity[];
}
