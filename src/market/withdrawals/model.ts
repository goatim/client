import { Model } from '../../api';
import { Session } from '../../auth';
import { Wallet } from '../wallets';
import { Capture } from '../captures';
import { CurrenciesRate } from '../currenciesRates';

export type WithdrawalStatus = 'created' | 'accepted' | 'refused' | 'done';

export type WithdrawalCurrencyIso = 'ETH';

export interface Withdrawal extends Model<'withdrawal'> {
  session?: Session | string;
  wallet?: Wallet | string;
  status?: WithdrawalStatus;
  error?: string;
  amount?: number;
  capture?: Capture | string;
  currency_iso?: WithdrawalCurrencyIso;
  currencies_rate?: CurrenciesRate | string;
  target_amount?: number;
  estimated_fees?: number;
  fees_paid_by_friday?: boolean;
  receiver_wallet?: string;
}
