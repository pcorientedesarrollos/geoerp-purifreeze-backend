// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
// Importamos nuestro DTO

@Controller('auth') // Todas las rutas en este archivo empezarán con /auth
export class AuthController {
  constructor(private authService: AuthService) {}

  // Definimos el endpoint para el login
  @Post('login') // La ruta completa será POST /auth/login
  @HttpCode(HttpStatus.OK) // Por defecto un POST devuelve 201, pero para un login es mejor un 200 (OK)
  async login(@Body() loginDto: LoginDto) {
    // 1. Usamos el servicio para validar las credenciales del usuario
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    // 2. Si las credenciales no son válidas, lanzamos un error
    if (!user) {
      throw new UnauthorizedException(
        'Credenciales inválidas. Por favor, inténtalo de nuevo.',
      );
    }

    // 3. Si las credenciales son correctas, usamos el servicio para generar y devolver el token
    return this.authService.login(user);
  }
}
