// Asumiendo que tienes una entidad para Clientes en:
import { GeoCliente } from 'src/app/geo_clientes/entities/geo_cliente.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('cliente_direcciones')
export class GeoClienteDireccionEntity {
  @PrimaryGeneratedColumn()
  idDireccion: number;

  @Column({ type: 'int' })
  idCliente: number;

  @Column({ type: 'varchar', length: 255 })
  direccion: string;

  @Column({ type: 'varchar', length: 100 })
  nombreSucursal: string;

  
//   // --- RELACIÓN OPCIONAL PERO RECOMENDADA ---
//   // Si tienes una entidad para Clientes, puedes descomentar esto
//   // para crear una relación formal.
//   @ManyToOne(() => GeoCliente, (cliente) => cliente.direcciones)
//   @JoinColumn({ name: 'idCliente' })
//   cliente: GeoCliente;
  
}