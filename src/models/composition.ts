import { Model } from '@cezembre/fronts';
import Wallet from './wallet';
import CompositionSetting from './compositionSetting';
import Player from './player';

export interface CompositionPosition<P = Player | string> {
  id: string;
  player: P;
}

export default interface Composition<P = Player | string> extends Model {
  wallet?: Wallet | string;
  setting?: CompositionSetting | string;
  goalkeeper?: P;
  positions?: CompositionPosition<P>[];
  is_valid?: boolean;
  positions_missing?: number;
}
