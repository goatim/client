import { Model } from '../../api';
import { Wallet } from '../../market';
import { Composition } from '../compositions';

export type MatchStatus =
  | 'created'
  | 'open'
  | 'ongoing'
  | 'passed'
  | 'closing'
  | 'closed'
  | 'cancelled';

export interface Match extends Model<'match'> {
  creator?: Wallet | string;
  title?: string;
  slug?: string;
  description?: string;
  beginning?: string;
  end?: string;
  is_public?: boolean;
  status?: MatchStatus;
  nb_participants?: number;
  podium?: Composition[];
  userComposition?: Composition;
}
