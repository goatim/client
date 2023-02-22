import { Model } from '../../api';
import { User } from '../../auth';
import { Wallet } from '../../market';
import { Asset, OrderType } from '../../trading';
import { Composition, Match } from '../../soccer';

export interface OrderMatchNotificationPayload {
  type?: OrderType;
  nb_matched?: number;
  total?: number;
  asset?: Asset | string;
}

export interface ClosedMatchNotificationPayload {
  match?: Match | string;
  composition?: Composition | string;
}

export interface NotificationEventMap {
  order_match: OrderMatchNotificationPayload;
  closed_match: ClosedMatchNotificationPayload;
}

export interface Notification<E extends keyof NotificationEventMap = keyof NotificationEventMap>
  extends Model<'notification'> {
  user?: User | string;
  wallet?: Wallet | string;
  event?: string;
  payload?: NotificationEventMap[E];
  is_seen?: boolean;
  is_read?: boolean;
}
