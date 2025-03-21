import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Payment } from '../../payments/entities/payment.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users') 
export class User {

  @PrimaryGeneratedColumn('uuid') 
  id!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email?: string;

  @Column({ type: 'varchar', length: 255 }) 
  password!: string;

  @Column({ type: 'boolean', default: true })
  isActive?: boolean;

  @CreateDateColumn({ type: 'timestamp' }) 
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' }) 
  updatedAt?: Date;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @OneToMany(() => Payment, (payment) => payment.user)
  payments!: Payment[];
}