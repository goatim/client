import { PaymentService } from '../services';

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

export type PaymentMethodType =
  | 'alipay'
  | 'au_becs_debit'
  | 'bacs_debit'
  | 'bancontact'
  | 'card'
  | 'card_present'
  | 'eps'
  | 'fpx'
  | 'giropay'
  | 'ideal'
  | 'oxxo'
  | 'p24'
  | 'sepa_debit'
  | 'sofort'
  | 'cash'
  | 'wallet';

export interface MinifiedPaymentMethod {
  type: PaymentMethodType;
  card?: Card;
}

export default interface PaymentMethod {
  service?: PaymentService;
  id: string;
  type?: PaymentMethodType;
  card?: Card;
  metadata?: unknown;
  is_default?: boolean;
}
