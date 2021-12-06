import { Model } from '@cezembre/fronts';
import Wallet from './wallet';
import Asset from './asset';

export default interface Transaction extends Model {
  asset?: Asset | string;
  from?: Wallet | string;
  to?: Wallet | string;
  price?: number;
  quantity?: number;
}
