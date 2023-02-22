import { DateTime } from 'luxon';
import { Model } from '../../api';
import { Session, User } from '../../auth';
import { Item } from '../items';
import { Billing } from '../billings';
import { PaymentIntent, PaymentIntentStatus, PaymentMethod } from '../../payment';

export interface Checkout extends Model<'checkout'> {
  session?: Session | string;
  user?: User | string;
  items?: Item[];
  total_items?: number;
  expiration?: DateTime;
  token?: string;
  items_prices?: number;
  items_vats?: number;
  total_to_pay?: number;
  billing?: Billing;
  payment_method?: PaymentMethod;
  payment_intent?: PaymentIntent;
  payment_status?: PaymentIntentStatus;
}
