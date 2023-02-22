import { Model } from '../../api';
import { Asset } from '../assets/model';
import { Wallet } from '../../market/wallets/model';
import { Booster } from '../boosters/model';

export type OrderType = 'buy' | 'sell';

export interface Order extends Model<'order'> {
  wallet?: Wallet | string;
  asset?: Asset | string;
  type?: OrderType;
  price_limit?: number;
  nb_shares?: number;
  is_cancelled?: boolean;
  error?: string;
  booster?: Booster | string;
}
