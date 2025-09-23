// Paystack configuration
export const PAYSTACK_PUBLIC_KEY = 'pk_test_your_public_key_here'; // Replace with your actual public key

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const initializePaystackPayment = (
  email: string,
  amount: number,
  reference: string,
  onSuccess: (response: any) => void,
  onClose: () => void
) => {
  const handler = (window as any).PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email,
    amount: amount * 100, // Paystack expects amount in kobo
    currency: 'NGN',
    ref: reference,
    callback: onSuccess,
    onClose,
  });
  
  handler.openIframe();
};

export const generateReference = (): string => {
  return `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};