import { Image, Model } from '@cezembre/fronts';
import Wallet from './wallet';

export default interface Match extends Model {
  creator?: Wallet | string;
  title?: string;
  slug?: string;
  description?: string;
  icon?: Image;
  start?: string;
  end?: string;
  nb_participants?: number;
  is_public?: boolean;
  participants?: Wallet[];
}
