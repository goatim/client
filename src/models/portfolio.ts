import { Model } from '@cezembre/fronts';
import Wallet from './wallet';
import Asset from './asset';
import Booster from './booster';

export default interface Portfolio extends Model {
  wallet?: Wallet | string;
  asset?: Asset | string;
  quantity?: number;
  buy_price?: number;
  booster?: Booster | string;
}
