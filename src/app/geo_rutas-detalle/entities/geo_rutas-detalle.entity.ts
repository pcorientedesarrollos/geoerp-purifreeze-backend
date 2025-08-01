// src/app/geo-rutas-detalle/entities/geo-rutas-detalle.entity.ts

import { GeoRecorridoEntity } from 'src/app/geo-recorrido/entities/geo-recorrido.entity';
import { GeoRutaEntity } from 'src/app/geo_rutas/entities/geo_ruta.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('geo_rutasDetalle') // El nombre de tu tabla final
export class GeoRutaDetalleEntity {
  @PrimaryGeneratedColumn()
  idRutaDetalle: number;

  @Column({ type: 'int' })
  idRuta: number;

  @Column({ type: 'int' })
  idServicioEquipo: number;

  @Column({ type: 'varchar', nullable: true })
  noSerie: string;

  @Column({ type: 'varchar' })
  nombreEquipo: string;

  @Column({ type: 'date' })
  fechaServicio: string;
  
  @Column({ type: 'time' })
  hora: string;

  @Column({ type: 'varchar' })
  tipoServicio: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'text', nullable: true })
  observacionesServicio: string;

  @Column({ type: 'int' })
  idContrato: number;

  @Column({ type: 'varchar' })
  nombreComercio: string;

  @Column({ type: 'smallint', default: 1 }) // Ejemplo: 1 = pendiente, 2 = visitado
  status: number;


  @ManyToOne(() => GeoRutaEntity, (ruta) => ruta.detalles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idRuta' })
  ruta: GeoRutaEntity;

  
  // --- RELACIÓN #2: Con GeoRecorrido (Uno a Muchos) ---
  // Esta es la sección que estás añadiendo, tomada de tu entidad antigua.
  // Significa: "UN detalle de ruta puede tener MUCHOS puntos de recorrido."
  @OneToMany(() => GeoRecorridoEntity, (recorrido) => recorrido.rutaDetalle)
  recorridos: GeoRecorridoEntity[];
}


