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

export interface PaymentIntent {
  id?: string;
  amount?: number;
  status?: PaymentIntentStatus;
  next_action?: PaymentIntentNextAction;
  client_secret?: string;
}
