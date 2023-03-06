import { Model } from '../../api';
import { Wallet } from '../../market';
import { CompositionSetting } from '../compositionSettings';
import { Player } from '../players';
import { Match } from '../matches';

export interface CompositionPosition<P = Model<'player'> | string> {
  id: string;
  player: P;
  nb_shares?: number;
  leverage?: number;
  gains?: number;
  variation?: number;
  score?: number;
}

export interface Composition<P = Player | string> extends Model<'composition'> {
  match?: Match | string;
  wallet?: Wallet | string;
  setting?: CompositionSetting | string;
  positions?: CompositionPosition<P>[];
  is_valid?: boolean;
  is_active?: boolean;
  gains?: number;
  variation?: number;
  score?: number;
  position?: number;
  last_position?: number;
  positions_missing?: number;
}
