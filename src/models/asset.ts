import { Model } from '@cezembre/fronts';
import Player from './player';
import Club from './club';
import League from './league';

export type AssetType = 'player' | 'club' | 'league';

export default interface Asset extends Model {
  entity?: string;
  type?: AssetType;
  name?: string;
  description?: string;
  slug?: string;
  shares?: number;
  last_dividend?: number;
  quotation?: number;
  session_variation?: number;
  player?: Player | string;
  club?: Club | string;
  league?: League | string;
}
