export type CardBrands =
  | 'amex'
  | 'diners'
  | 'discover'
  | 'jcb'
  | 'mastercard'
  | 'unionpay'
  | 'visa'
  | 'unknown';

export interface Card {
  country?: string;
  brand?: CardBrands;
  exp_month?: number;
  exp_year?: number;
  last4?: string;
}

export interface MinifiedPaymentMethod {
  type: 'card' | 'cash' | 'wallet';
  card?: Card;
}

export default interface PaymentMethod {
  id: string;
  type?: 'card' | 'cash' | 'wallet';
  card?: Card;
  metadata?: unknown;
  is_default?: boolean;
}
