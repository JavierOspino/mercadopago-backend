import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(@Body() data: any) {
    const { action, data: { id: paymentId } } = data;
    if (action === 'payment.updated') {
      await this.paymentService.getPaymentStatus(paymentId);
    }
  }

  @Post('checkout')
  async createCheckout(@Body() body: { amount: number; description: string; email: string }) {
    return this.paymentService.createPayment(body.amount, body.description, body.email);
  }
}
