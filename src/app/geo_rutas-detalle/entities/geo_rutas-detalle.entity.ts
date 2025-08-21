// COPIA Y PEGA ESTE CONTENIDO COMPLETO

import { Exclude, Expose } from 'class-transformer';
import { GeoRecorridoEntity } from 'src/app/geo-recorrido/entities/geo-recorrido.entity';
import { GeoRutaEntity } from 'src/app/geo_rutas/entities/geo_ruta.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('geo_rutasDetalle')
export class GeoRutaDetalleEntity {
  @Expose() @PrimaryGeneratedColumn() idRutaDetalle: number;
  @Expose() @Column({ type: 'int' }) idRuta: number;
  @Expose() @Column({ type: 'int' }) idServicioEquipo: number;
  @Expose() @Column({ type: 'varchar', nullable: true }) noSerie: string;
  @Expose() @Column({ type: 'varchar' }) nombreEquipo: string;
  @Expose() @Column({ type: 'date' }) fechaServicio: string;
  @Expose() @Column({ type: 'time' }) hora: string;
  @Expose() @Column({ type: 'varchar' }) tipoServicio: string;
  @Expose() @Column({ type: 'text', nullable: true }) descripcion: string;
  @Expose() @Column({ type: 'text', nullable: true }) observacionesServicio: string;
  @Expose() @Column({ type: 'int' }) idContrato: number;
  @Expose() @Column({ type: 'varchar' }) nombreComercio: string;
  @Expose() @Column({ type: 'smallint', default: 1 }) status: number;

  // ===================== ¡ESTO ROMPE EL BUCLE INFINITO! =====================
  // Le decimos a NestJS que NUNCA incluya la referencia de vuelta a la ruta
  // cuando convierta un 'detalle' a JSON.
  @Exclude()
  @ManyToOne(() => GeoRutaEntity, (ruta) => ruta.detalles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idRuta' })
  ruta: GeoRutaEntity;

  // Hacemos lo mismo para la relación con recorridos por seguridad.
  // Normalmente no querrías cargar todos los puntos GPS al ver los detalles de una ruta.
  @Exclude()
  @OneToMany(() => GeoRecorridoEntity, (recorrido) => recorrido.rutaDetalle)
  recorridos: GeoRecorridoEntity[];
}