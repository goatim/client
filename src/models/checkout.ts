import { Model } from '@cezembre/fronts';
import { DateTime } from 'luxon';
import User from './user';
import Item from './item';
import Session from './session';

export default interface Checkout extends Model {
  session?: Session | string;
  user?: User | string;
  items?: Item[] | string;
  total_items?: number;
  expiration?: DateTime;
  token?: string;
  items_prices?: number;
  items_vats?: number;
  total_to_pay?: number;
}
