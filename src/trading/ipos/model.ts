import { Model } from '../../api';
import Asset from '../assets/model';

export type IpoType = 'live' | 'pre-sales';

export default interface Ipo extends Model {
  asset?: Asset | string;
  stocks_tags?: string[];
  type?: IpoType;
  beginning?: string;
  end?: string;
  price?: number;
  title?: string;
  description?: string;
}
