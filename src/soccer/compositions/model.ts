import { Model } from '../../api';
import Wallet from '../../market/wallets/model';
import CompositionSetting from '../compositionSettings/model';
import Player from '../players/model';
import Match from '../matches/model';

export interface CompositionPosition<P = Model<'player'> | string> {
  id: string;
  player: P;
}

export default interface Composition<P = Player | string> extends Model<'composition'> {
  match?: Match | string;
  wallet?: Wallet | string;
  setting?: CompositionSetting | string;
  goalkeeper?: P;
  positions?: CompositionPosition<P>[];
  is_valid?: boolean;
  is_active?: boolean;
  positions_missing?: number;
  rank?: number;
  dividends_gains?: number;
  dividends_percentage?: number;
}
