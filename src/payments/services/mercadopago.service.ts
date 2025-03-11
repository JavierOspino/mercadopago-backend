import { Injectable } from '@nestjs/common';
import { PaymentNotFoundException } from '../../common/exceptions/payment-not-found.exception';
import axios from 'axios';

@Injectable()
export class MercadoPagoService {
  private readonly mercadoPagoUrl = 'https://api.mercadopago.com/v1/payments';
  private readonly accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  async createPayment(amount: number, description: string, email: string) {
    try {
      const response = await axios.post(
        this.mercadoPagoUrl,
        {
          transaction_amount: amount,
          description,
          payment_method_id: 'pix', // o cualquier otro método permitido
          payer: { email },
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
      const errorPayment = new PaymentNotFoundException('Error al procesar el pago');
      throw errorPayment;
    }
  }

  async getPaymentStatus(paymentId: string) {
      try {
        const response = await axios.get(`${this.mercadoPagoUrl}/${paymentId}`, {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        });
        return response.data.status;
      } catch (error) {
        const errorPayment = new PaymentNotFoundException('Error al obtener el estado del pago');
        throw errorPayment;
      }
    }
  }
