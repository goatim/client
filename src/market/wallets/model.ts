import { Model } from '../../api';
import { User } from '../../auth';
import { Rank } from '../../trading';
import { Image } from '../../medias';

export type WalletType = 'user' | 'team' | 'broker';

export interface Wallet extends Model<'wallet'> {
  owner?: User | string;
  name?: string;
  slug?: string;
  type?: WalletType;
  amount?: number;
  withdrawable_amount?: number;
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
