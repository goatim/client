import { Model } from '@cezembre/fronts';
import Dividend from './dividend';

export type PhysicalEventType = 'match' | 'goal';

export default interface PhysicalEvent extends Model {
  type?: PhysicalEventType;
  name?: string;
  beginning?: string;
  end?: string;
  parent_event?: PhysicalEvent | string;
  sub_events?: PhysicalEvent[];
  dividends?: Dividend[];
}
