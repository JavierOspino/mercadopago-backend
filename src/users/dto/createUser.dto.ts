import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  
  @IsEmail({}, { message: 'El email no es válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email?: string;

  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password!: string;

  @IsBoolean({ message: 'isActive debe ser un booleano' })
  @IsOptional()
  isActive?: boolean;

  @IsEnum(UserRole)
  role!: UserRole;
}