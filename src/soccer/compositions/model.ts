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
  score?: number;
  gains?: number;
}

export interface Composition<P = Player | string> extends Model<'composition'> {
  match?: Match | string;
  wallet?: Wallet | string;
  setting?: CompositionSetting | string;
  goalkeeper?: P;
  goalkeeper_nb_shares?: number;
  goalkeeper_leverage?: number;
  goalkeeper_score?: number;
  goalkeeper_gains?: number;
  positions?: CompositionPosition<P>[];
  is_valid?: boolean;
  is_active?: boolean;
  dividends_gains?: number;
  dividends_percentage?: number;
  score?: number;
  position?: number;
  last_position?: number;
  positions_missing?: number;
}
