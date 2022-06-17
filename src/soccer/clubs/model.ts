import { Model } from '../../api';
import City from '../../geo/cities/model';
import League from '../leagues/model';
import Player from '../players/model';
import { Image } from '../../medias/image';

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
