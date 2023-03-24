import { Model } from '../../api';
import { User } from '../../auth';
import { Wallet } from '../../market';
import { PaymentService } from '../services';
import { PaymentMethod, PaymentMethodType } from '../paymentMethods';

export interface RedirectToUrl {
  return_url?: string;
  url?: string;
}

export type PaymentIntentNextActionType =
  | 'unknown'
  | 'redirect_to_url'
  | 'use_stripe_sdk'
  | 'oxxo_display_details';

export interface PaymentIntentNextAction {
  redirect_to_url?: RedirectToUrl;
  type: PaymentIntentNextActionType;
  use_stripe_sdk?: unknown;
}

export type PaymentIntentStatus =
  | 'unknown'
  | 'requires_payment_method'
  | 'requires_confirmation'
  | 'requires_action'
  | 'requires_capture'
  | 'processing'
  | 'captured'
  | 'canceled'
  | 'failed'
  | 'refunded'
  | 'succeeded';

export interface PaymentIntent extends Model<'payment_intent'> {
  user?: User | string;
  wallet?: Wallet | string;
  service?: PaymentService;
  external_id?: string;
  amount?: number;
  status?: PaymentIntentStatus;
  payment_method_type?: PaymentMethodType;
  payment_method?: PaymentMethod | string;
  next_action?: PaymentIntentNextAction;
  client_secret?: string;
}
