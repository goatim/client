import { Image, Model } from '@cezembre/fronts';
import City from '../../geo/cities/model';
import League from '../leagues/model';
import Player from '../players/model';

export default interface Club extends Model {
  league?: League | string;
  city?: City | string;
  name?: string;
  icon?: Image;
  short_name?: string;
  slug?: string;
  description?: string;
  players?: Player[];
}
