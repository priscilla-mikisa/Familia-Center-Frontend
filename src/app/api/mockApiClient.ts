// src/app/api/payments/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import mockApiClient from '../mockApiClient';

interface PaymentRequest {
  amount: number;
  currency: string;
  paymentMethod: 'mpesa' | 'airtel' | 'card';
  customerEmail: string;
  phone?: string;
}

export async function POST(request: NextRequest) {
  try {
    const paymentData: PaymentRequest = await request.json();
    
    // Validate required fields
    if (!paymentData.amount || !paymentData.currency || !paymentData.paymentMethod) {
      return NextResponse.json(
        { error: 'Amount, currency and payment method are required' },
        { status: 400 }
      );
    }

    // Fixed: Now only passing 2 arguments
    const response = await mockApiClient.post(
      '/payments/initiate',
      paymentData
    );
    
    return NextResponse.json(response.data);
    
  } catch (error) {
    console.error('Payment processing failed:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');

    if (reference) {
      const response = await mockApiClient.get(`/payments/verify/${reference}`);
      return NextResponse.json(response.data);
    } else {
      const response = await mockApiClient.get('/payments/history');
      return NextResponse.json(response.data);
    }
  } catch (error) {
    console.error('Failed to process payment request:', error);
    return NextResponse.json(
      { error: 'Failed to process payment request' },
      { status: 500 }
    );
  }
}