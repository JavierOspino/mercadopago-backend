import { IsEmail, MinLength, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto {
    @IsEmail({}, { message: 'El email no es válido' })
    @IsOptional()
    email?: string;
  
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @IsOptional()
    password?: string;
  
    @IsBoolean({ message: 'isActive debe ser un booleano' })
    @IsOptional()
    isActive?: boolean;
  }