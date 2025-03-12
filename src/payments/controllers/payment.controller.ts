import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(@Body() createPaymentDto: { amount: number; description: string; email: string }) {
    return this.paymentService.createPayment(createPaymentDto.amount, createPaymentDto.description, createPaymentDto.email);
  }

  @Get(':id')
  async getPayment(@Param('id') id: string) {
    return this.paymentService.getPaymentStatus(id);
  }
}
