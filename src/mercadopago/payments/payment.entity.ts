import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({ unique: true })
    paymentId!: string; // ID del pago en MercadoPago

  @ManyToOne(() => User, (user) => user.payments, { onDelete: 'CASCADE' })
    user!: User;

  @Column()
    status!: string; // 'approved', 'pending', 'rejected'

  @Column('decimal', { precision: 10, scale: 2 })
    amount!: number; // Monto pagado

  @CreateDateColumn()
    createdAt!: Date;
}
