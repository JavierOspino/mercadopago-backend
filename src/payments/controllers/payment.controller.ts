import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';

@Controller('webhooks')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentService) {}

  @Post('mercadopago')
  async mercadoPagoWebhook(@Body() payload: any) {
    console.log('🔔 Webhook recibido:', payload);
    await this.paymentsService.handlePaymentWebhook(payload);
    return { message: 'Webhook procesado' };
  }
}