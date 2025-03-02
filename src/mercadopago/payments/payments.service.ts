import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentRepository } from './payment.repo';
import { UserService } from '../../users/user.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly userService: UserService,
  ) {}

  async handlePaymentWebhook(data: any) {
    const { id, status, transaction_amount, payer } = data;

    // Buscar el usuario por su email (o ID si lo tienes en la notificación)
    const user = await this.userService.findByEmail(payer.email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verificar si el pago ya existe
    const existingPayment = await this.paymentRepository.findPaymentById(id);
    if (existingPayment) {
      return;
    }

    // Guardar el pago en la base de datos
    await this.paymentRepository.createPayment({
      paymentId: id,
      user,
      status,
      amount: transaction_amount,
    });

    console.log('✅ Pago guardado en la base de datos');
  }
}
