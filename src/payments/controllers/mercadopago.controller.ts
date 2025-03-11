import { Controller, Post, Body, Res } from '@nestjs/common';
import { MercadoPagoService } from '../services/mercadopago.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('payment')
  async createCheckout(@Body() body: { amount: number; description: string; email: string }) {
    return await this.mercadoPagoService.createCheckout(body.amount, body.description, body.email);
  }

  @Post('webhook')
  async handleWebhook(@Res() res: any, @Body() body: any) {
    console.log('📩 Webhook recibido:', JSON.stringify(body, null, 2));

    // Verifica si es un evento de pago
    if (body.action === 'payment.created' || body.type === 'payment') {
      const paymentId = body.data.id;
      console.log('🔹 Pago recibido con ID:', paymentId);

      // Llamar servicio para procesar el pago
      await this.mercadoPagoService.processPayment(paymentId);
    }

    return res.status(200).send({ message: 'Webhook recibido correctamente' });
  }
}
