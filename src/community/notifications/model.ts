import { Model } from '../../api';
import User from '../../auth/users/model';
import Wallet from '../../market/wallets/model';
import Asset from '../../trading/assets/model';
import { OrderType } from '../../trading/orders/model';

export interface NotificationOrderMatchPayload {
  type?: OrderType;
  nb_matched?: number;
  total?: number;
  asset?: Asset | string;
}

export interface NotificationEventMap {
  order_match: NotificationOrderMatchPayload;
}

export default interface Notification<
  E extends keyof NotificationEventMap = keyof NotificationEventMap,
> extends Model<'notification'> {
  user?: User | string;
  wallet?: Wallet | string;
  event?: string;
  payload?: NotificationEventMap[E];
  is_seen?: boolean;
  is_read?: boolean;
}
