import { Model } from '../../api';
import Club from '../clubs/model';
import { Image } from '../../medias/image';

export default interface League extends Model<'league'> {
  name?: string;
  icon?: Image;
  slug?: string;
  description?: string;
  clubs?: Club[];
}
