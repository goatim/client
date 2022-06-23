import { OrderType } from '../trading/orders/model';
import Asset from '../trading/assets/model';

type NotificationEvent = 'order-match' | 'pack-received';

export interface EventOrderMatchPayload {
  type?: OrderType;
  nb_matched?: number;
  total?: number;
  asset?: Asset;
}

export default NotificationEvent;
