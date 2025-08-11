import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('geo_status') 
export class GeoStatus {

    @PrimaryGeneratedColumn()
    idStatus: number;
  
  @Column({ type: 'varchar' })
    status: string;


}