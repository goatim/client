import { Model } from '../../api';
import Asset from '../assets/model';

export type StockType = 'ipo' | 'pack';

export default interface Stock extends Model {
  asset?: Asset | string;
  type?: StockType;
  tags?: string[];
  initial_shares?: number;
  nb_shares?: number;
}
