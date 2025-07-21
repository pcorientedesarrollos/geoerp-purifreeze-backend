import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// Importamos el módulo de usuarios
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/app/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule, // Para poder usar UsersService
    PassportModule,
    JwtModule.register({
      secret: 'TU_CLAVE_SECRETA_MUY_DIFICIL', // ¡CAMBIA ESTO! Usa una variable de entorno en un proyecto real.
      signOptions: { expiresIn: '1d' }, // El token expirará en 1 día
    }),
  ],
  providers: [AuthService, JwtStrategy], // Añadiremos más providers después
  controllers: [AuthController],
})
export class AuthModule {}
