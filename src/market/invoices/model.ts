import { Model } from '../../api';
import { Item } from '../items';
import { MinifiedBilling } from '../billings';
import { MinifiedPaymentMethod } from '../../payment';

export type InvoiceStatus = 'confirmed' | 'errored' | 'reclaimed' | 'refunded';

export interface Invoice extends Model<'invoice'> {
  number?: string;
  items?: Item[];
  billing?: MinifiedBilling;
  payment_method?: MinifiedPaymentMethod;
  total_paid?: number;
  currency?: string;
  status?: InvoiceStatus;
  error?: string;
}
