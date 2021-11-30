import { Model } from '@cezembre/fronts';
import { DateTime } from 'luxon';
import Item from './item';
import { TimeSlot } from './period';

export type CollectStatus =
  | 'created'
  | 'accepted'
  | 'ready'
  | 'cancelled'
  | 'collected'
  | 'archived'
  | 'errored';

export default interface Collect extends Model {
  order?: string;
  user?: string;
  invoice?: string;
  items?: Item[];
  total_items?: number;
  items_prices?: number;
  items_vats?: number;
  total_amount?: number;
  name?: string;
  phone?: string;
  infos?: string;
  wished_date?: DateTime;
  wished_time_slot?: TimeSlot;
  expected_time?: DateTime;
  status?: CollectStatus;
}
