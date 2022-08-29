import { Model } from '../../api';
import Session from '../../auth/sessions/model';
import Wallet from '../wallets/model';
import Capture from '../captures/model';
import CurrenciesRate from '../currenciesRates/model';

export type WithdrawalStatus = 'created' | 'accepted' | 'refused' | 'done';

export type WithdrawalCurrencyIso = 'ETH';

export default interface Withdrawal extends Model {
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
