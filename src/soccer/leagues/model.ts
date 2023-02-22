import { Model } from '../../api';
import { Club } from '../clubs';
import { Image } from '../../medias';

export interface League extends Model<'league'> {
  name?: string;
  icon?: Image;
  slug?: string;
  description?: string;
  clubs?: Club[];
}
