import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './services/payments.service';
import { PaymentsController } from './controllers/payments.controller';
import { PaymentRepository } from './repositories/payment.repo';
import { Payment } from './entities/payment.entity';
import { UserService } from '../users/services/user.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User])],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentRepository, UserService],
})
export class PaymentsModule {}
