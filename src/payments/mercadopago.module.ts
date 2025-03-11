import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MercadoPagoService } from './services/mercadopago.service';
import { MercadoPagoController } from './controllers/mercadopago.controller';
import { PaymentModule } from './payment.module';

@Module({
  imports: [ConfigModule, HttpModule, PaymentModule],
  providers: [MercadoPagoService],
  controllers: [MercadoPagoController],
  exports: [MercadoPagoService],
})
export class MercadoPagoModule {}