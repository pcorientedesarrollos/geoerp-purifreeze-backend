// src/app/users/users.controller.ts
import { Controller, Get } from '@nestjs/common'; // Asegúrate de importar Get
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('facial-login-data') // La ruta será GET /users/facial-login-data
  async getUsersForFacialLogin() {
    return this.usersService.findUsersForFacialLogin();
  }
}
