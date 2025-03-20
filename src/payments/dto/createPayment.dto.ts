import { IsNumber, IsString, IsEmail } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  amount!: number;

  @IsString()
  description!: string;

  @IsEmail()
  email!: string;
}
