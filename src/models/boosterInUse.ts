import { Model } from '@cezembre/fronts';
import Booster from './booster';
import Portfolio from './portfolio';

export default interface BoosterInUse extends Model {
  booster?: Booster | string;
  portfolio?: Portfolio | string;
  quantity?: number;
  leverage?: number;
}
