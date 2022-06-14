import { Model } from '@cezembre/fronts';
import Booster from '../boosters/model';
import Portfolio from '../portfolios/model';
import Wallet from '../../market/wallets/model';
import Order from '../orders/model';

export default interface BoosterInUse extends Model {
  booster?: Booster | string;
  wallet?: Wallet | string;
  order?: Order | string;
  portfolio?: Portfolio | string;
  leverage?: number;
  start_quotation?: number;
  gains?: number;
  variation?: number;
  stopped_at?: string;
}
