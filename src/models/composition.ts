import { Model } from '@cezembre/fronts';
import Wallet from './wallet';
import CompositionSetting from './compositionSetting';
import Player from './player';

export interface CompositionPosition {
  id: string;
  player?: Player | string;
}

export default interface Composition extends Model {
  wallet?: Wallet | string;
  setting?: CompositionSetting | string;
  goalkeeper?: Player | string;
  positions?: CompositionPosition[];
}
