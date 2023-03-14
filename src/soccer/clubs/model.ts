import { Model } from '../../api';
import { City } from '../../geo';
import { League } from '../leagues';
import { Player } from '../players';
import { Image } from '../../medias';

export interface Club extends Model<'club'> {
  league?: League | string;
  city?: City | string;
  name?: string;
  icon?: Image;
  short_name?: string;
  slug?: string;
  description?: string;
  players?: Player[];
  primary_color?: string;
  secondary_color?: string;
}
