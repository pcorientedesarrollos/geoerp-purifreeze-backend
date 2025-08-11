import { Column } from "typeorm";

export class GeoServicio {


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

  @Column({  type: 'varchar'}) // Ejemplo: 1 = pendiente, 2 = visitado
  status: string;

  @Column({ type: 'varchar' })
  tipoServicio: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'text', nullable: true })
  observacionesServicio: string;

  @Column({ type: 'int' })
  idContrato: number;

  @Column({ type: 'int' })
  idCliente: number;

  @Column({ type: 'varchar' })
  nombreComercio: string;


}
