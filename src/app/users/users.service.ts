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

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ usuario: username });
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
  // --- MÉTODO NUEVO A AÑADIR ---
  // Busca en la BD todos los usuarios cuyo campo 'descriptor_facial' no sea nulo.
}
