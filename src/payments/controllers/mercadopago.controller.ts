import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('webhook') // 👈 Esto define '/mercadopago/webhook'
  @HttpCode(200)
  async handleWebhook(@Body() data: any) {
    console.log('📩 Webhook recibido:', JSON.stringify(data, null, 2));

    const { action, data: { id: paymentId } = {} } = data || {};

    if (action === 'payment.updated' && paymentId) {
      await this.paymentService.updatePaymentStatus(paymentId);
    }

    return { message: 'Webhook recibido' };
  }

  @Post('checkout')
  async createCheckout(@Body() body: { amount: number; description: string; email: string }) {
    return this.paymentService.createPayment(body.amount, body.description, body.email);
  }
}
