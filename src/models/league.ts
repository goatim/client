import { Image, Model } from '@cezembre/fronts';
import Club from './club';

export default interface League extends Model {
  name?: string;
  icon?: Image;
  slug?: string;
  description?: string;
  clubs?: Club[];
}
