import { Model } from '@cezembre/fronts';
import Wallet from '../../market/wallets/model';
import Asset from '../assets/model';
import BoosterInUse from '../boostersInUse/model';

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
