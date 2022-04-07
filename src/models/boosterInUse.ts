import { Model } from '@cezembre/fronts';
import Booster from './booster';
import Portfolio from './portfolio';

export default interface BoosterInUse extends Model {
  booster?: Booster | string;
  portfolio?: Portfolio | string;
  leverage?: number;
  start_quotation?: number;
  gains?: number;
  variation?: number;
  stopped_at?: string;
  end_quotation?: number;
}
