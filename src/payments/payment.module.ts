import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';
import { PaymentRepository } from './repositories/payment.repo';
import { Payment } from './entities/payment.entity';
import { UserService } from '../users/services/user.service';
import { User } from '../users/entities/user.entity';
import { MercadoPagoService } from './services/mercadopago.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User])],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository, UserService, MercadoPagoService],
  exports: [PaymentService],
})
export class PaymentModule {}
