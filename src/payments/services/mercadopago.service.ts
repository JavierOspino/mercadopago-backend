import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MercadoPagoService {
  private readonly mercadoPagoUrl = 'https://api.mercadopago.com/checkout/preferences';
  private readonly accessToken: string;

  constructor(private readonly configService: ConfigService) {
    this.accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN') || '';
  }

  async createCheckout(amount: number, description: string, email: string) {
    try {
      const response = await axios.post(
        this.mercadoPagoUrl,
        {
          items: [{ title: description, quantity: 1, unit_price: amount, currency_id: 'COP' }],
          payer: { email },
          back_urls: { success: ' https://223f-181-51-88-64.ngrok-free.app/success', failure: ' https://223f-181-51-88-64.ngrok-free.app/failure' },
          auto_return: 'approved',
        },
        { headers: { Authorization: `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' } },
      );
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la preferencia de pago');
    }
  }

  async getPaymentDetails(paymentId: string) {
    try {
      const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        },
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('❌ Error al obtener detalles del pago:', error.response?.data || error.message);
      } else {
        console.error('❌ Error desconocido:', error);
      }
      return null;
    }
  }
}
