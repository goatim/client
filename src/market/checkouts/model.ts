import { DateTime } from 'luxon';
import { Model } from '../../api';
import { Session } from '../../auth';
import { Item } from '../items';
import { MinifiedBilling } from '../billings';
import { MinifiedPaymentMethod, PaymentIntent } from '../../payment';
import { Wallet } from '../wallets';

export type CheckoutStatus = 'active' | 'paying' | 'confirmed' | 'executed';

export interface Checkout extends Model<'checkout'> {
  session?: Session | string;
  wallet?: Wallet | string;
  items?: Item[];
  total_items?: number;
  expiration?: DateTime;
  items_prices?: number;
  items_vats?: number;
  total_to_pay?: number;
  billing?: MinifiedBilling;
  payment_method?: MinifiedPaymentMethod;
  payment_intent?: PaymentIntent | string;
  status?: CheckoutStatus;
}
