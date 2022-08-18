import { Model } from '../../api';
import Session from '../../auth/sessions/model';
import Wallet from '../wallets/model';

export type WithdrawalStatus = 'created' | 'accepted' | 'refused' | 'done';

export type WithdrawalCurrencyIso = 'ether';

export default interface Withdrawal extends Model {
  session?: Session | string;
  wallet?: Wallet | string;
  status?: WithdrawalStatus;
  error?: string;
  amount_asked?: number;
  amount_withdrawn?: number;
  currency_iso?: WithdrawalCurrencyIso;
  currency_rate?: number;
  estimated_fees?: number;
  fees_paid_by_friday?: boolean;
}
