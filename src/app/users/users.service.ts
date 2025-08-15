// // src/app/users/users.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { IsNull, Not, Repository } from 'typeorm'; // <-- AÑADE Not y IsNull
// import { User } from './entities/user.entity';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}
//   async findOneById(id: number): Promise<User | null> {
//     return this.usersRepository.findOneBy({ idUsuario: id });
//   }
//   async findOneByUsername(username: string): Promise<User | null> {
//     return this.usersRepository.findOneBy({ usuario: username });
//     // Si no se encuentra un usuario con ese nombre de usuario, devuelve null
//   }
//   async registerFace(userId: number, descriptor: number[]): Promise<void> {
//     const descriptorJson = JSON.stringify(descriptor);
//     await this.usersRepository.update(userId, {
//       descriptor_facial: descriptorJson,
//     });
//   }
//   async findUsersForFacialLogin(): Promise<
//     { idUsuario: number; descriptor_facial: string }[]
//   > {
//     return this.usersRepository.find({
//       select: ['idUsuario', 'descriptor_facial'], // Seleccionamos solo las columnas que nos interesan
//       where: {
//         descriptor_facial: Not(IsNull()),
//       },
//     });
//   }

//   async findAll(): Promise<User[]> {
//     return this.usersRepository.find();
//   }
//   // --- MÉTODO NUEVO A AÑADIR ---
//   // Busca en la BD todos los usuarios cuyo campo 'descriptor_facial' no sea nulo.
// }



// Archivo: src/app/users/users.service.ts (NestJS)

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RutaStatus } from '../geo_rutas/entities/geo_ruta.entity'; // <-- ¡IMPORTANTE! Importar el Enum

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // --- MÉTODO NUEVO ---
  // Devuelve solo los usuarios que NO están asignados a una ruta 'PLANEADA' o 'EN_CURSO'.
  async findAvailableOperators(): Promise<User[]> {
    return this.usersRepository.createQueryBuilder('user')
      .where(qb => {
        // Subconsulta para encontrar usuarios en rutas activas
        const subQuery = qb.subQuery()
          .select('1')
          .from('geo_rutas', 'ruta')
          .where('ruta.idUsuario = user.idUsuario')
          .andWhere("ruta.statusRuta IN (:...statuses)", { 
            statuses: [RutaStatus.PLANEADA, RutaStatus.EN_CURSO] 
          })
          .getQuery();
        
        // La condición principal es que el usuario NO EXISTA en la subconsulta
        return `NOT EXISTS (${subQuery})`;
      })
      .getMany();
  }

  // --- MÉTODOS EXISTENTES (sin cambios) ---
  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ idUsuario: id });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ usuario: username });
  }

  async registerFace(userId: number, descriptor: number[]): Promise<void> {
    const descriptorJson = JSON.stringify(descriptor);
    await this.usersRepository.update(userId, {
      descriptor_facial: descriptorJson,
    });
  }

  async findUsersForFacialLogin(): Promise<{ idUsuario: number; descriptor_facial: string }[]> {
    return this.usersRepository.find({
      select: ['idUsuario', 'descriptor_facial'],
      where: {
        descriptor_facial: Not(IsNull()),
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}