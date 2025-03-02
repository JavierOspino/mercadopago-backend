import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { MercadoPagoModule } from './mercadopago/mercadopago.module';
import { PaymentsModule } from './mercadopago/payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: String(process.env.POSTGRES_PASSWORD),
        database: process.env.POSTGRES_DB,
        autoLoadEntities: true,
        synchronize: true, // False in production
      }),
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    AuthModule,
    MercadoPagoModule,
    PaymentsModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {
  constructor() {}
}
