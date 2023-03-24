import { PaymentService } from '../services';
import { Model } from '../../api';
import { User } from '../../auth';
import { Wallet } from '../../market';

export type CardBrand =
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
  brand?: CardBrand;
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
  public_id?: string;
  user?: string;
  wallet?: string;
  service?: PaymentService;
  external_id?: string;
  type?: PaymentMethodType;
  card?: Card;
  is_default?: boolean;
}

export interface PaymentMethod extends Model<'payment_method'> {
  user?: User | string;
  wallet?: Wallet | string;
  service?: PaymentService;
  external_id?: string;
  type?: PaymentMethodType;
  card?: Card;
  metadata?: object;
  is_default?: boolean;
}
