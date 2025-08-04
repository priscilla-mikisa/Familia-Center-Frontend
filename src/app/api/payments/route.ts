import apiClient from "../mockApiClient";

export const PaymentService = {
  async initiatePayment(paymentData: {
    amount: number;
    currency: string;
    paymentMethod: 'mpesa' | 'airtel' | 'card';
    customerEmail: string;
    phone?: string;
  }) {
    return apiClient.post('/payments/initiate', paymentData);
  },

  async verifyPayment(reference: string) {
    return apiClient.get(`/payments/verify/${reference}`);
  },

  async getPaymentHistory(params: { page?: number; limit?: number }) {
    return apiClient.get('/payments/history', { params });
  },
};