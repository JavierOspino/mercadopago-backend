import { Controller, Post, Body, Headers } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('payment')
  async createCheckout(@Body() body: { amount: number; description: string; email: string }) {
    return await this.mercadoPagoService.createCheckout(body.amount, body.description, body.email);
  }

  @Post('webhook')
  async handleWebhook(@Body() data: any, @Headers('x-signature') signature: string) {
    console.log('🔔 Webhook recibido:', data);
    console.log('🔑 Firma:', signature);

    return { message: 'Webhook recibido con éxito' };
  }
}
