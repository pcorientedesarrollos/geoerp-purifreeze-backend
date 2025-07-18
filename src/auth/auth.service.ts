// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/app/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 1. Valida si el usuario y la contraseña son correctos
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(pass, user.clave))) {
      // Si la contraseña coincide, devolvemos el usuario sin la contraseña
      const { clave, ...result } = user;
      return result;
    }
    return null;
  }

  // 2. Si la validación es exitosa, crea y devuelve un token de acceso
  async login(user: any) {
    const payload = {
      username: user.usuario,
      sub: user.idUsuario,
      permissions: user.permiso,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async loginByUserId(userId: number) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado.');
    }
    // Reutilizamos el método de login que ya teníamos
    return this.login(user);
  }
}
