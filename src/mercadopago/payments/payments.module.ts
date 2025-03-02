import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentRepository } from './payment.repo';
import { Payment } from './payment.entity';
import { UserService } from '../../users/user.service';
import { User } from '../../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User])],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentRepository, UserService],
})
export class PaymentsModule {}
