import { Model } from '@cezembre/fronts';
import Wallet from './wallet';

export default interface Match extends Model {
  creator?: Wallet | string;
  title?: string;
  slug?: string;
  description?: string;
  start?: string;
  end?: string;
  nb_participants?: number;
  is_public?: boolean;
}
