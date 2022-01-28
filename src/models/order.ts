import { Model } from '@cezembre/fronts';
import Asset from './asset';
import Wallet from './wallet';
import Booster from './booster';

export type OrderType = 'buy' | 'sell';

export default interface Order extends Model {
  wallet?: Wallet | string;
  asset?: Asset | string;
  type?: OrderType;
  price_limit?: number;
  quantity?: number;
  is_cancelled?: boolean;
  error?: string;
  booster?: Booster | string;
}
