import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MercadoPagoService {
  private readonly mercadoPagoUrl: string = 'https://api.mercadopago.com/checkout/preferences';
  private readonly accessToken: string;
  private readonly urlSite: string;

  constructor(private readonly configService: ConfigService) {
    this.accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN') || '';
    this.urlSite = this.configService.get<string>('URL_SITE') || '';
  }

  async createCheckout(amount: number, description: string, email: string) {
    try {
      const response = await axios.post(
        this.mercadoPagoUrl,
        {
          items: [{ title: description, quantity: 1, unit_price: amount, currency_id: 'COP' }],
          payer: { email },
          back_urls: {
            success: this.urlSite + '/success',
            failure: this.urlSite + '/failure',
          },
          auto_return: 'approved',
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        },
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
        console.error(
          '❌ Error al obtener detalles del pago:',
          error.response?.data || error.message,
        );
      } else {
        console.error('❌ Error desconocido:', error);
      }
      return null;
    }
  }
}
