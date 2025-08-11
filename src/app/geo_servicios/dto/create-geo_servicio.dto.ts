import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateGeoServicioDto {

      @IsOptional()
      @IsString({ message: 'El noSerie debe ser una cadena de texto.' })
      noSerie?: string;
    
      // Hacemos este opcional también por seguridad, aunque casi siempre tendrá valor.
      @IsOptional()
      @IsString({ message: 'El nombreEquipo debe ser una cadena de texto.' })
      nombreEquipo?: string;
    
      @IsString() @IsNotEmpty()
      fechaServicio: string;
    
      @IsString() @IsNotEmpty()
      hora: string;

      @IsString() @IsNotEmpty()
      status: string;
    
      @IsString() @IsNotEmpty()
      tipo_Servicio: string;
    
      @IsOptional() @IsString()
      descripcion?: string;
    
      @IsOptional() @IsString()
      observacionesServicio?: string;
    
      @IsInt() @IsNotEmpty()
      idContrato: number;
      
      @IsInt() @IsNotEmpty()
      idCliente: number;
    
      @IsString() @IsNotEmpty()
      nombreComercio: string;
    
  
    
}
