import { Country } from '../countries/model';
import { Image } from '../../medias/image';
import { Model } from '../../api';

export interface City extends Model<'city'> {
  name?: string;
  slug?: string;
  short_name?: string;
  description?: string;
  country?: Country | string;
  illustration?: Image;
}
