// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'TU_CLAVE_SECRETA_MUY_DIFICIL', // ¡Debe ser la misma que en auth.module!
    });
  }

  // Passport decodifica el token y nos pasa el payload.
  // Lo que devolvemos aquí se adjuntará al objeto `request` como `req.user`.
  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      permissions: payload.permissions,
    };
  }
}
