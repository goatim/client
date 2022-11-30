import { Model } from '../api';
import User from '../auth/users/model';
import Wallet from '../market/wallets/model';

export default interface Notification<P = unknown> extends Model<'notification'> {
  user?: User | string;
  wallet?: Wallet | string;
  event?: string;
  payload?: P;
  is_seen?: boolean;
  is_read?: boolean;
}
