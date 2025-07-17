import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'usuarios' }) // Le decimos que esta entidad mapea a la tabla 'usuarios'
export class User {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({ unique: true })
  usuario: string;

  @Column()
  clave: string;

  @Column()
  permiso: number;

  @Column({ type: 'text', nullable: true })
  descriptor_facial: string;

  // Hook de TypeORM: Antes de insertar un nuevo usuario, encripta la contraseña
  @BeforeInsert()
  async hashPassword() {
    this.clave = await bcrypt.hash(this.clave, 10);
  }
}
