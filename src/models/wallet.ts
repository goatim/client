import { Model } from '@cezembre/fronts';
import User from './user';

export type WalletType = 'user' | 'team' | 'broker';

export default interface Wallet extends Model {
  owner?: User | string;
  name?: string;
  type?: WalletType;
  amount?: number;
  is_default?: boolean;
}
