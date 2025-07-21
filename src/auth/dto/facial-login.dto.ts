import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class FacialLoginDto {
  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  descriptor: number[];
}
