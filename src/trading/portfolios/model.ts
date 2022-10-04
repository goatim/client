import { Model } from '../../api';
import Wallet from '../../market/wallets/model';
import Asset from '../assets/model';
import BoosterInUse from '../boosters/model';

export default interface Portfolio extends Model {
  wallet?: Wallet | string;
  asset?: Asset | string;
  buy_price?: number;
  nb_shares?: number;
  valuation?: number;
  gains?: number;
  variation?: number;
  boosters_gains?: number;
  dividends_gains?: number;
  total_gains?: number;
  total_variations?: number;
  boosters?: BoosterInUse[];
}
