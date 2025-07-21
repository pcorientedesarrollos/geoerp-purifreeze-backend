// src/app/users/users.controller.ts
import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common'; // Asegúrate de importar Get
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RegisterFaceDto } from './dto/register-face.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('facial-login-data') // La ruta será GET /users/facial-login-data
  async getUsersForFacialLogin() {
    return this.usersService.findUsersForFacialLogin();
  }
  @Patch('me/register-face') // La ruta será PATCH /users/me/register-face
  @UseGuards(JwtAuthGuard) // ¡Protegemos la ruta!
  async registerFace(@Request() req, @Body() registerFaceDto: RegisterFaceDto) {
    // Obtenemos el ID del usuario del token JWT que fue validado por el guardián
    const userId = req.user.userId;
    await this.usersService.registerFace(userId, registerFaceDto.descriptor);
    return { message: 'Rostro registrado con éxito.' };
  }
}
