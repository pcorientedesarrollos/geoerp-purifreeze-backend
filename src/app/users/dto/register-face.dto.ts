// src/app/users/dto/register-face.dto.ts
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterFaceDto {
  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  descriptor: number[];
}
