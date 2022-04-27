import { Model } from '@cezembre/fronts';
import Wallet from './wallet';
import Asset from './asset';
import BoosterInUse from './boosterInUse';

export default interface Portfolio extends Model {
  wallet?: Wallet | string;
  asset?: Asset | string;
  buy_price?: number;
  quantity?: number;
  valuation?: number;
  gains?: number;
  variation?: number;
  boosters_gains?: number;
  dividends_gains?: number;
  total_gains?: number;
  total_variations?: number;
  boosters?: BoosterInUse[];
}
