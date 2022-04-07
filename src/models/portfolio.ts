import { Model } from '@cezembre/fronts';
import Wallet from './wallet';
import Asset from './asset';
import BoosterInUse from './boosterInUse';

export default interface Portfolio extends Model {
  wallet?: Wallet | string;
  asset?: Asset | string;
  quantity?: number;
  buy_price?: number;
  gains?: number;
  variation?: number;
  boosters?: BoosterInUse[];
  dividends_gains?: number;
  total_gains?: number;
  total_variations?: number;
}
