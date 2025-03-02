import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MercadoPagoService } from './mercadopago.service';
import { MercadoPagoController } from './mercadopago.controller';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [MercadoPagoService],
  controllers: [MercadoPagoController],
  exports: [MercadoPagoService],
})
export class MercadoPagoModule {}