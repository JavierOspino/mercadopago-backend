import { Injectable } from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment.repo';
import { MercadoPagoService } from '../services/mercadopago.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepo: PaymentRepository,
    private readonly mercadoPagoService: MercadoPagoService,
  ) {}

  async createPayment(amount: number, description: string, email: string) {
    const checkout = await this.mercadoPagoService.createCheckout(amount, description, email);

    const payment = await this.paymentRepo.createPayment({
      amount,
      description,
      email,
      paymentId: checkout.id, 
      status: 'pending',
    });

    return {
      id: payment.id,
      paymentId: payment.paymentId,
      description: payment.description,
      email: payment.email,
      status: payment.status,
      amount: payment.amount,
      createdAt: payment.createdAt,
      init_point: checkout.init_point, // <- Ahora se retorna correctamente
    };
  }

  async getPaymentStatus(paymentId: string) {
    console.log(`🔍 Buscando estado de pago: ${paymentId}`);

    const paymentData = await this.mercadoPagoService.getPaymentDetails(paymentId);
    if (!paymentData) {
      console.error('❌ No se pudo obtener información del pago.');
      return;
    }
  
    console.log(`✅ Estado del pago en MercadoPago: ${paymentData.status}`);
  
    return await this.paymentRepo.updatePaymentStatus(paymentId, paymentData.status);
  }
}
