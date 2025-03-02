import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('webhooks')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('mercadopago')
  async mercadoPagoWebhook(@Body() payload: any) {
    console.log('🔔 Webhook recibido:', payload);
    await this.paymentsService.handlePaymentWebhook(payload);
    return { message: 'Webhook procesado' };
  }
}