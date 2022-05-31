import { Image, Model } from '@cezembre/fronts';
import Wallet from './wallet';

export type MatchStatus = 'planned' | 'ongoing' | 'passed' | 'cancelled';

export default interface Match extends Model {
  creator?: Wallet | string;
  title?: string;
  slug?: string;
  description?: string;
  beginning?: string;
  end?: string;
  is_public?: boolean;
  participants?: Wallet[];
  status?: MatchStatus;
  icon?: Image;
  nb_participants?: number;
}
