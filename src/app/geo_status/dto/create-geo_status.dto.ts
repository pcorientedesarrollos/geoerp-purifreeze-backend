import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateGeoStatusDto {

      @IsNotEmpty() @IsString()
      status: string;
    
}
