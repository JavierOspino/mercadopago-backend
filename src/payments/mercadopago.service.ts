import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MercadoPagoService {
  private readonly mercadoPagoUrl = 'https://api.mercadopago.com/checkout/preferences';
  private readonly accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  async createCheckout(amount: number, description: string, email: string) {
    try {
      console.log('🔹 Access Token:', this.accessToken);

      const response = await axios.post(
        this.mercadoPagoUrl,
        {
          items: [
            {
              title: description,
              quantity: 1,
              unit_price: amount,
              currency_id: 'COP', // O USD, BRL, etc.
            },
          ],
          payer: {
            email: email || 'test_user_123456@testuser.com', // Usar un email de prueba
          },
          back_urls: {
            success: 'https://546c-181-51-88-64.ngrok-free.app/success',
            failure: 'https://546c-181-51-88-64.ngrok-free.app/failure',
            pending: 'https://546c-181-51-88-64.ngrok-free.app/pending',
          },
          auto_return: 'approved', // Redirigir automáticamente si el pago es aprobado
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data; // Devuelve la preferencia creada con el link de pago
    } catch (error: any) {
      console.error('❌ Error al crear la preferencia de pago:', error.response?.data || error.message);
      throw new Error(`Error al procesar el pago: ${error.response?.data?.message || error.message}`);
    }
  }
}
