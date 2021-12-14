import { Model } from '@cezembre/fronts';
import User from './user';
import Rank from './rank';

export type WalletType = 'user' | 'team' | 'broker';

export default interface Wallet extends Model {
  owner?: User | string;
  name?: string;
  type?: WalletType;
  amount?: number;
  is_default?: boolean;
  ranks?: Rank[];
}
