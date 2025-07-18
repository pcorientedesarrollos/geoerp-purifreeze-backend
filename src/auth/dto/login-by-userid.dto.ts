// src/auth/dto/login-by-userid.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';

export class LoginByUserIdDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
