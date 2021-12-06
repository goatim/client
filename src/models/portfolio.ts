import { Model } from '@cezembre/fronts';
import Wallet from './wallet';
import Asset from './asset';

export default interface Portfolio extends Model {
  wallet?: Wallet | string;
  asset?: Asset | string;
  quantity?: number;
  buy_price?: number;
}
