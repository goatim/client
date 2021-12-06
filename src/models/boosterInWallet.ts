import { Model } from '@cezembre/fronts';
import Wallet from './wallet';
import Booster from './booster';

export default interface Portfolio extends Model {
  booster?: Booster | string;
  wallet?: Wallet | string;
  quantity?: number;
  leverage?: number;
}
