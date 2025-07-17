import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; // Asegúrate de que la ruta a tu entidad sea correcta

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // CAMBIO: La función ahora promete devolver User | null, que es lo correcto.
  async findOneByUsername(username: string): Promise<User | null> {
    // El código de abajo ya devuelve User | null, así que ahora todo coincide.
    return this.usersRepository.findOneBy({ usuario: username });
  }
}
