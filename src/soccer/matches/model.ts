import { Model } from '../../api';
import Wallet from '../../market/wallets/model';
import { Image } from '../../medias/image';

export type MatchStatus = 'planned' | 'ongoing' | 'passed' | 'cancelled';

export default interface Match extends Model {
  creator?: Wallet | string;
  title?: string;
  slug?: string;
  description?: string;
  beginning?: string;
  end?: string;
  is_public?: boolean;
  status?: MatchStatus;
  icon?: Image;
}
