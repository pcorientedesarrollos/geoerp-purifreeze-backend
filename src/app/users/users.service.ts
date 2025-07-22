// src/app/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm'; // <-- AÑADE Not y IsNull
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ idUsuario: id });
  }
  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ usuario: username });
    // Si no se encuentra un usuario con ese nombre de usuario, devuelve null
  }
  async registerFace(userId: number, descriptor: number[]): Promise<void> {
    const descriptorJson = JSON.stringify(descriptor);
    await this.usersRepository.update(userId, {
      descriptor_facial: descriptorJson,
    });
  }
  async findUsersForFacialLogin(): Promise<
    { idUsuario: number; descriptor_facial: string }[]
  > {
    return this.usersRepository.find({
      select: ['idUsuario', 'descriptor_facial'], // Seleccionamos solo las columnas que nos interesan
      where: {
        descriptor_facial: Not(IsNull()),
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  // --- MÉTODO NUEVO A AÑADIR ---
  // Busca en la BD todos los usuarios cuyo campo 'descriptor_facial' no sea nulo.
}
