import { Model } from '@cezembre/fronts';
import Asset from './asset';
import Wallet from './wallet';

export type OrderType = 'buy' | 'sell';

export default interface Order extends Model {
  wallet?: Wallet | string;
  asset?: Asset | string;
  type?: OrderType;
  price_limit?: number;
  quantity?: number;
  is_cancelled?: boolean;
  error?: string;
}
