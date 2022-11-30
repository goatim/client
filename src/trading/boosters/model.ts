import { Model } from '../../api';
import Portfolio from '../portfolios/model';
import Wallet from '../../market/wallets/model';
import Order from '../orders/model';
import BoosterFactory from '../boosterFactories/model';

export default interface Booster extends Model<'booster'> {
  factory?: BoosterFactory | string;
  wallet?: Wallet | string;
  order?: Order | string;
  portfolio?: Portfolio | string;
  leverage?: number;
  duration?: number;
  start_quotation?: number;
  stop_quotation?: number;
  gains?: number;
  variation?: number;
  expiration?: string;
  stopped_at?: string;
}
