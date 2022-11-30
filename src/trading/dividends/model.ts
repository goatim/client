import { Model } from '../../api';
import Asset from '../assets/model';
import PhysicalEvent from '../../soccer/physicalEvents/model';

export type DividendType = 'general' | 'match';

export default interface Dividend extends Model<'dividend'> {
  type?: DividendType;
  asset?: Asset | string;
  physical_event?: PhysicalEvent | string;
  percentage?: number;
  amount?: number;
  is_distributed?: boolean;
  nb_distributed?: number;
}
