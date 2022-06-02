import { Model } from '@cezembre/fronts';
import Wallet from './wallet';
import CompositionSetting from './compositionSetting';
import Player from './player';
import Match from './match';

export interface CompositionPosition<P = Player | string> {
  id: string;
  player: P;
}

export default interface Composition<P = Player | string> extends Model {
  match?: Match | string;
  wallet?: Wallet | string;
  setting?: CompositionSetting | string;
  goalkeeper?: P;
  positions?: CompositionPosition<P>[];
  is_valid?: boolean;
  is_published?: boolean;
  positions_missing?: number;
}
