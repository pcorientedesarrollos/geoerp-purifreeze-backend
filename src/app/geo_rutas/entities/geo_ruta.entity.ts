import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('geo_rutas')
export class GeoRutaEntity {
  @PrimaryGeneratedColumn()
  idRuta: number;

  @Column({ type: 'int' })
  idUsuario: number;

  @Column({ type: 'int' })
  idCliente: number;

  @Column({ type: 'int' })
  idUnidadTransporte: number;

  @Column({ type: 'int' })
  idTipoServicio: number;

  @Column({ type: 'datetime' })
  fecha_hora: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  kmInicial: string;
}