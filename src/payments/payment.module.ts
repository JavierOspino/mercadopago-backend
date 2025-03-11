import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './services/payment.service';
import { PaymentsController } from './controllers/payment.controller';
import { PaymentRepository } from './repositories/payment.repo';
import { Payment } from './entities/payment.entity';
import { UserService } from '../users/services/user.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User])],
  controllers: [PaymentsController],
  providers: [PaymentService, PaymentRepository, UserService],
  exports: [PaymentService],
})
export class PaymentModule {}
