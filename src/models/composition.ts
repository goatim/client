import { Model } from '@cezembre/fronts';
import Wallet from './wallet';
import CompositionSetting, { CompositionSettingPosition } from './compositionSetting';
import Player from './player';

export interface CompositionPosition extends CompositionSettingPosition {
  player?: Player | string;
}

export default interface Composition extends Model {
  wallet?: Wallet | string;
  setting?: CompositionSetting | string;
  goal?: Player | string;
  positions?: CompositionPosition[];
}
