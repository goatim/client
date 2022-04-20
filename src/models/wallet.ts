import { Image, Model } from '@cezembre/fronts';
import User from './user';
import Rank from './rank';

export type WalletType = 'user' | 'team' | 'broker';

export default interface Wallet extends Model {
  owner?: User | string;
  picture?: Image;
  name?: string;
  slug?: string;
  type?: WalletType;
  amount?: number;
  portfolios_quotation?: number;
  portfolios_session_variation?: number;
  is_default?: boolean;
  ranks?: Rank[];
  position?: number;
  rank?: Rank | string;
  rank_position?: number;
  portfolios_gains?: number;
  boosters_gains?: number;
  dividends_gains?: number;
  total_gains?: number;
}
