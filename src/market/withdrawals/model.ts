import { Model } from '../../api';
import Session from '../../auth/sessions/model';
import Wallet from '../wallets/model';

export type WithdrawalStatus = 'created' | 'accepted' | 'refused' | 'done';

export type WithdrawalCurrency = 'ether';

export default interface Withdrawal extends Model {
  session?: Session | string;
  wallet?: Wallet | string;
  status?: WithdrawalStatus;
  error?: string;
  amount_asked?: number;
  amount_withdrawn?: number;
  currency_iso?: WithdrawalCurrency;
  currency_rate?: number;
  estimated_fees?: number;
  fees_paid_by_friday?: boolean;
}
