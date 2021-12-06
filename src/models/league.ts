import { Model } from '@cezembre/fronts';
import Club from './club';

export default interface League extends Model {
  name?: string;
  slug?: string;
  description?: string;
  clubs?: Club[];
}
