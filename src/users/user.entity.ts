import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users') // Nombre de la tabla en la DB
export class User {
  @PrimaryGeneratedColumn('uuid') // Usa UUID en lugar de números secuenciales
  id?: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email?: string;

  @Column({ type: 'varchar', length: 255 }) 
  password?: string;

  @Column({ type: 'boolean', default: true })
  isActive?: boolean;

  @CreateDateColumn({ type: 'timestamp' }) // Automático en la creación
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' }) // Automático en cada actualización
  updatedAt?: Date;
}

