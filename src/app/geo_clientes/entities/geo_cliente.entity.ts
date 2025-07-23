import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes')
export class GeoCliente {
  @PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn()
  idcliente: number;

  @Column({  name: 'razon_social',type: 'varchar', length: 50 })
  razon_social: string;

  @Column({ name: 'rfc', type: 'varchar', length: 50 })
  rfc: string;
  
  
  @Column({ type: 'varchar', length: 100, nullable: true })
  nombreEncargado: string;
  
  @Column({ type: 'varchar', length: 255, nullable: true })
  regimen: string;
  
  @Column({ type: 'int', nullable: true })
  idMetodoPago: number;
  
  @Column({ type: 'varchar', length: 255, nullable: true })
  direccionFiscal: string;
  
  @Column({ type: 'varchar', length: 50, nullable: true })
  usuarioCaptura: string;
  
  @Column({ type: 'varchar', length: 50, nullable: true })
  usuarioModifica: string;
  
  @Column({ type: 'varchar', length: 10, default: '0' })
  estado: string;
  
  @Column({ type: 'varchar', length: 10 })
  codigoPostal: string;
  
  @Column({ type: 'varchar', length: 50, nullable: true })
  nombreArchivo: string;
  
@Column({ name: 'nombreComercio', type: 'varchar', length: 50 })  
nombreComercio: string;
}
