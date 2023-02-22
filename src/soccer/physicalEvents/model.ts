import { Model } from '../../api';
import { Dividend } from '../../trading/dividends/model';

export type PhysicalEventType = 'match' | 'goal';

export interface PhysicalEvent extends Model<'physical_event'> {
  type?: PhysicalEventType;
  name?: string;
  beginning?: string;
  end?: string;
  parent_event?: PhysicalEvent | string;
  sub_events?: PhysicalEvent[];
  dividends?: Dividend[];
}
