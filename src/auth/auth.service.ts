// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/app/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    // Comparamos la contraseña proporcionada con la hasheada en la BD
    if (user && (await bcrypt.compare(pass, user.clave))) {
      // Si es correcta, devolvemos el usuario sin la clave
      const { clave, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.usuario,
      sub: user.idUsuario,
      permissions: user.permiso, // El permiso viene de la tabla usuarios
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}