
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ChangePasswordDto } from 'src/auth/dto/change-password.dto';
import * as bcrypt from 'bcrypt';

// La importación de 'RutaStatus' ha sido eliminada.

@Injectable()
export class UsersService {

  // ===================== ¡CORRECCIÓN CLAVE! =====================
  // Definimos los IDs de los estados que consideramos "no disponibles" para un operador.
  // Asumimos que 1 = 'Planeada'/'Confirmado' y 2 = 'En Curso'.
  private readonly RUTA_STATUS_NO_DISPONIBLE: number[] = [1, 2];
  // =============================================================

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Devuelve solo los usuarios (operadores) que NO están asignados a una ruta 'PLANEADA' o 'EN_CURSO'.
   */
  async findAvailableOperators(): Promise<User[]> {
    return this.usersRepository.createQueryBuilder('user')
      .where(qb => {
        // Subconsulta para encontrar los IDs de usuarios que están en rutas activas o planeadas
        const subQuery = qb.subQuery()
          .select('ruta.idUsuario')
          .from('geo_rutas', 'ruta')
          // Se usa la columna 'idEstatus' y el array de IDs numéricos
          .where("ruta.idEstatus IN (:...statuses)", { 
            statuses: this.RUTA_STATUS_NO_DISPONIBLE 
          })
          .getQuery();
        
        // La condición principal es que el ID del usuario NO ESTÉ en el resultado de la subconsulta
        return `user.idUsuario NOT IN (${subQuery})`;
      })
      // Opcional: puedes añadir un filtro para roles específicos si lo necesitas.
      // .andWhere('user.rol = :rol', { rol: 'operador' }) 
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

  async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const user = await this.usersRepository.findOneBy({ idUsuario: userId });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    const isPasswordMatching = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.clave,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('La contraseña actual es incorrecta.');
    }

    const hashedNewPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      10,
    );

    await this.usersRepository.update(userId, { clave: hashedNewPassword });

    return { message: 'Contraseña actualizada exitosamente.' };
  }
}