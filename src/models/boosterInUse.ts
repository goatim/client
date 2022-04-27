import { Model } from '@cezembre/fronts';
import Booster from './booster';
import Portfolio from './portfolio';
import Wallet from './wallet';
import Order from './order';

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
