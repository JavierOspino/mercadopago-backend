import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users') 
export class User {
  @PrimaryGeneratedColumn('uuid') 
  id?: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email?: string;

  @Column({ type: 'varchar', length: 255 }) 
  password?: string;

  @Column({ type: 'boolean', default: true })
  isActive?: boolean;

  @CreateDateColumn({ type: 'timestamp' }) 
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' }) 
  updatedAt?: Date;
}

