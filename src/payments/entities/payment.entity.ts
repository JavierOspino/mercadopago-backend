import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({ unique: true })
    paymentId!: string; // ID del pago en MercadoPago

  @ManyToOne(() => User, (user) => user.payments, { onDelete: 'CASCADE' })
    user!: User;

  @Column()
    description!: string; // Descripción del pago

  @Column()
    email!: string; // Email del usuario que pagó

  @Column()
    status!: string; // 'approved', 'pending', 'rejected'

  @Column('decimal', { precision: 10, scale: 2 })
    amount!: number; // Monto pagado

  @CreateDateColumn()
    createdAt!: Date;
}
