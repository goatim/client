import { Model } from '../../api';
import { Asset } from '../assets/model';

export type IpoType = 'live' | 'pre-sales';

export interface Ipo extends Model<'ipo'> {
  asset?: Asset | string;
  stocks_tags?: string[];
  type?: IpoType;
  beginning?: string;
  end?: string;
  price?: number;
  title?: string;
  description?: string;
}
