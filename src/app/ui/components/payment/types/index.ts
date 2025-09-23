export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  popular?: boolean;
  customPricing?: boolean;
}

export interface CheckoutData {
  plan: Plan;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  paymentMethod: 'card' | 'bank_transfer';
}

export interface PaymentResponse {
  success: boolean;
  reference: string;
  message: string;
}