import { Model } from '@cezembre/fronts';
import Billing from './billing';
import PaymentMethod from './paymentMethod';
import PaymentIntent, { PaymentIntentStatus } from './paymentIntent';
import Order from './order';

export default interface Invoice extends Model {
  number?: string;
  billing?: Billing;
  payment_method?: PaymentMethod;
  payment_intent?: PaymentIntent;
  total_to_pay?: number;
  total_paid?: number;
  currency?: string;
  payment_status?: PaymentIntentStatus;
  orders?: Order[];
}
