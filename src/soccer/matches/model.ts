import { Model } from '../../api';
import Wallet from '../../market/wallets/model';

export type MatchStatus =
  | 'created'
  | 'open'
  | 'ongoing'
  | 'passed'
  | 'closing'
  | 'closed'
  | 'cancelled';

export default interface Match extends Model<'match'> {
  creator?: Wallet | string;
  title?: string;
  slug?: string;
  description?: string;
  beginning?: string;
  end?: string;
  is_public?: boolean;
  status?: MatchStatus;
  nb_participants?: number;
}
