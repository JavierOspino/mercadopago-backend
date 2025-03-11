import { Controller, Post, Get, Param, Body, Req } from '@nestjs/common';
import { MercadoPagoService } from '../services/mercadopago.service';
import { PaymentService } from '../services/payment.service';

@Controller('payments')
export class MercadoPagoController {
  constructor(
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly paymentService: PaymentService,
  ) {}

  @Post()
  async createPayment(@Body() paymentDto: any) {
    // Crear pago en MercadoPago
    const paymentResponse = await this.mercadoPagoService.createCheckout(
      paymentDto.amount,
      paymentDto.description,
      paymentDto.email,
    );

    // Almacenar información del pago en la base de datos
    await this.paymentService.savePayment({
      paymentId: paymentResponse.id,
      status: 'pending',
      amount: paymentDto.amount,
      email: paymentDto.email,
    });

    return { init_point: paymentResponse.init_point };
  }

  @Get(':id')
  async getPayment(@Param('id') paymentId: string) {
    return this.paymentService.getPaymentById(paymentId);
  }

  @Post('webhooks')
  async handleWebhook(@Req() req: any) {
    const paymentData = req.body;
    
    if (paymentData.action === 'payment.created' || paymentData.action === 'payment.updated') {
      await this.paymentService.updatePaymentStatus(
        paymentData.data.id,
        paymentData.data.status
      );
    }
    return { message: 'Webhook recibido' };
  }
}
