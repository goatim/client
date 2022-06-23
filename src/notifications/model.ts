import { Model } from '../api';
import User from '../auth/users/model';
import Wallet from '../market/wallets/model';

export default interface Notification<P = unknown> extends Model {
  user?: User | string;
  wallet?: Wallet | string;
  event?: string;
  payload?: P;
  seen_at?: string;
  read_at?: string;
}
