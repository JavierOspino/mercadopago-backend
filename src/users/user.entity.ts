import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsBoolean, MinLength, IsNotEmpty } from 'class-validator';

@Entity('users') // Nombre de la tabla en la DB
export class User {
  @PrimaryGeneratedColumn('uuid') // Usa UUID en lugar de números secuenciales
  id: string | undefined;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsEmail({}, { message: 'El email no es válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string | undefined;

  @Column({ type: 'varchar', length: 255 }) // No almacenes passwords en texto plano
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string | undefined;

  @Column({ type: 'boolean', default: true })
  @IsBoolean({ message: 'isActive debe ser un booleano' })
  isActive: boolean | undefined;

  @CreateDateColumn({ type: 'timestamp' }) // Automático en la creación
  createdAt: Date | undefined;

  @UpdateDateColumn({ type: 'timestamp' }) // Automático en cada actualización
  updatedAt: Date | undefined;
}
