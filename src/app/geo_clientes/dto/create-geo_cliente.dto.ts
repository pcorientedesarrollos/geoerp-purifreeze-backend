import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGeoClienteDto {
  @IsOptional()
  @IsString()
  nombreComercio: string;

  @IsOptional()
  @IsString()
  razon_social?: string;

  @IsString()
  @IsNotEmpty()
  rfc: string;

  @IsOptional()
  @IsString()
  nombreEncargado?: string;

  @IsOptional()
  @IsString()
  regimen?: string;

  @IsOptional()
  @IsInt()
  idMetodoPago?: number;

  @IsOptional()
  @IsString()
  direccionFiscal?: string;

  @IsOptional()
  @IsString()
  usuarioCaptura?: string;

  @IsOptional()
  @IsString()
  usuarioModifica?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsString()
  codigoPostal: string;

  @IsOptional()
  @IsString()
  nombreArchivo?: string;
}
