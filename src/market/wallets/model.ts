import { Model } from '../../api';
import User from '../../auth/users/model';
import Rank from '../../trading/ranks/model';
import { Image } from '../../medias/image';

export type WalletType = 'user' | 'team' | 'broker';

export default interface Wallet extends Model {
  owner?: User | string;
  name?: string;
  slug?: string;
  type?: WalletType;
  amount?: number;
  floor_withdrawal?: number;
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
  ethereum_address?: string;
  picture?: Image;
}
