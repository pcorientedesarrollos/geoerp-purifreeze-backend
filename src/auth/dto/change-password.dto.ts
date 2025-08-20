// src/app/users/dto/change-password.dto.ts
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'La contraseña actual no puede estar vacía.' })
  currentPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'La nueva contraseña no puede estar vacía.' })
  @MinLength(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres.' })
  newPassword: string;
}