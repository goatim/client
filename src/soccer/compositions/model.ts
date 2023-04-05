import { Model } from '../../api';
import { Wallet } from '../../market';
import { CompositionSetting } from '../compositionSettings';
import { Player } from '../players';
import { Match } from '../matches';
import { Booster, BoosterFactory } from '../../trading';

export interface CompositionPosition<P = Player | string> {
  id: string;
  player: P;
  nb_shares?: number;
  booster?: Booster | string;
  booster_factory?: BoosterFactory | string;
  booster_leverage?: number;
  gains?: number;
  variation?: number;
  score?: number;
}

export type CompositionStatus = 'valid' | 'missing_position' | 'requires_checkout';

export interface Composition<P = Player | string> extends Model<'composition'> {
  match?: Match | string;
  wallet?: Wallet | string;
  setting?: CompositionSetting | string;
  positions?: CompositionPosition<P>[];
  status: CompositionStatus;
  gains?: number;
  variation?: number;
  score?: number;
  position?: number;
  last_position?: number;
  positions_missing?: number;
}
