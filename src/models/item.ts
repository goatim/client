import { DateTime } from 'luxon';
import Product from './product';
import { TimeSlot } from './period';

export default interface Item {
  id?: string;
  illustration?: string;
  name?: string;
  product_price?: number;
  product_vat?: number;
  total_price?: number;
  total_vat?: number;
  quantity?: number;
  product?: Product | string;
  wished_date?: DateTime;
  wished_time_slot?: TimeSlot;
  infos?: string;
}
