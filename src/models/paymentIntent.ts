export interface RedirectToUrl {
  return_url?: string;
  url?: string;
}

export interface AlipayHandleRedirect {
  native_data?: string;
  native_url?: string;
  return_url?: string;
  url?: string;
}

export interface OxxoDisplayDetails {
  expires_after?: number;
  hosted_voucher_url?: string;
  number?: string;
}

export type NextActionType =
  | 'unknown'
  | 'use_stripe_sdk'
  | 'redirect_to_url'
  | 'alipay_handle_redirect'
  | 'oxxo_display_details';

export interface NextAction {
  alipay_handle_redirect?: AlipayHandleRedirect;
  oxxo_display_details?: OxxoDisplayDetails;
  redirect_to_url?: RedirectToUrl;
  type: NextActionType;
  use_stripe_sdk?: unknown;
}

export type PaymentIntentStatus =
  | 'unknown'
  | 'canceled'
  | 'processing'
  | 'requires_action'
  | 'requires_capture'
  | 'requires_confirmation'
  | 'requires_payment_method'
  | 'succeeded';

export default interface PaymentIntent {
  id?: string;
  amount?: number;
  status?: PaymentIntentStatus;
  next_action?: NextAction;
  client_secret?: string;
}
