
import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RegisterFaceDto } from './dto/register-face.dto';
import { ChangePasswordDto } from 'src/auth/dto/change-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // --- ENDPOINT NUEVO ---
  @Get('available-operators')
  findAvailableOperators() {
    return this.usersService.findAvailableOperators();
  }

  // --- ENDPOINTS EXISTENTES (sin cambios) ---
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get('facial-login-data')
  async getUsersForFacialLogin() {
    return this.usersService.findUsersForFacialLogin();
  }

  @Patch('me/register-face')
  @UseGuards(JwtAuthGuard)
  async registerFace(@Request() req, @Body() registerFaceDto: RegisterFaceDto) {
    const userId = req.user.userId;
    await this.usersService.registerFace(userId, registerFaceDto.descriptor);
    return { message: 'Rostro registrado con éxito.' };
  }


    @UseGuards(JwtAuthGuard)
  @Patch('me/change-password')
  changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    // req.user.userId es extraído automáticamente del token JWT por JwtAuthGuard
    const userId = req.user.userId;
    return this.usersService.changePassword(userId, changePasswordDto);
  }
}