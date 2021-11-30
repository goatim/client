import { Model } from '@cezembre/fronts';
import { DateTime } from 'luxon';
import User from './user';
import { OrderType } from './order';
import Shop from './shop';
import Item from './item';
import Recipient from './recipient';

export default interface Checkout extends Model {
  user?: User | string;
  recipient?: Recipient;
  recipient_same_as_billing?: boolean;
  shop?: Shop | string;
  items?: Item[];
  total_items?: number;
  order_type?: OrderType;
  expiration?: DateTime;
  token?: string;
  items_prices?: number;
  items_vats?: number;
  shipments_prices?: number;
  shipments_vats?: number;
  total_to_pay?: number;
}
