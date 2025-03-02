import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async createPayment(paymentData: Partial<Payment>): Promise<Payment> {
    const payment = this.paymentRepo.create(paymentData);
    return this.paymentRepo.save(payment);
  }

  async findPaymentById(paymentId: string): Promise<Payment | null> {
    return this.paymentRepo.findOne({ where: { paymentId } });
  }
}
