import { Model } from '@cezembre/fronts';
import { DateTime } from 'luxon';
import User from '../../auth/users/model';
import Item from '../items/model';
import Session from '../../auth/sessions/model';
import Billing from '../billings/model';
import PaymentMethod from '../../payment/methods/model';
import PaymentIntent, { PaymentIntentStatus } from '../../payment/intents/model';

export default interface Checkout extends Model {
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
