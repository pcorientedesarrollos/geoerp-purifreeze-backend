import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GeoRutaDetalleEntity } from '../../geo_rutas-detalle/entities/geo_rutas-detalle.entity';
import { GeoRutasParadaEntity } from 'src/app/geo-rutas-paradas/entities/geo-rutas-parada.entity';

@Entity('geo_rutas')
export class GeoRutaEntity {
  @PrimaryGeneratedColumn()
  idRuta: number;

  @Column({ type: 'int' })
  idUsuario: number;

  @Column({ type: 'int' })
  idUnidadTransporte: number;

  @Column({ type: 'datetime' })
  fecha_hora: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  kmlInicial: string;

  // --- CAMBIO 2: Usar el nombre de clase correcto en la relación ---
  @OneToMany(() => GeoRutasParadaEntity, (parada) => parada.ruta, {
    cascade: true,
  })
  // --- CAMBIO 3: Usar el tipo correcto para la propiedad del arreglo ---
  paradas: GeoRutasParadaEntity[];

  // Relación con Detalles (Rastreo GPS) - Esta ya estaba bien
  @OneToMany(() => GeoRutaDetalleEntity, (detalle) => detalle.ruta)
  detalles: GeoRutaDetalleEntity[];
}
