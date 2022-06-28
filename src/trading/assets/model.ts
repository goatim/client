import { Model } from '../../api';
import Player from '../../soccer/players/model';
import Club from '../../soccer/clubs/model';
import League from '../../soccer/leagues/model';

export type AssetType = 'player' | 'club' | 'league';

export default interface Asset extends Model {
  entity?: string;
  type?: AssetType;
  name?: string;
  description?: string;
  slug?: string;
  total_shares?: number;
  last_dividend?: number;
  quotation?: number;
  session_variation?: number;
  player?: Player | string;
  club?: Club | string;
  league?: League | string;
}
