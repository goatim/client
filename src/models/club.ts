import { Model } from '@cezembre/fronts';
import City from './city';
import League from './league';
import Player from './player';

export default interface Club extends Model {
  league?: League | string;
  city?: City | string;
  name?: string;
  short_name?: string;
  slug?: string;
  description?: string;
  players?: Player[];
}
