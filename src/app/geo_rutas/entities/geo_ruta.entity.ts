// ... otras importaciones
import { GeoRutaDetalleEntity } from 'src/app/geo_rutas-detalle/entities/geo_rutas-detalle.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity('geo_rutas')
export class GeoRutaEntity {
  // ... todas las columnas que ya tenías (idRuta, idUsuario, etc.)
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
  kmlInicial: string;

  // --- NUEVA RELACIÓN AÑADIDA ---
  // Relación: UNA ruta tiene MUCHOS detalles.
  @OneToMany(() => GeoRutaDetalleEntity, (detalle) => detalle.ruta, {
    cascade: true, // Permite guardar detalles junto con la ruta.
  })
  detalles: GeoRutaDetalleEntity[];
}