import { Image, Model } from '@cezembre/fronts';
import Country from './country';

export default interface City extends Model {
  name?: string;
  slug?: string;
  short_name?: string;
  description?: string;
  country?: Country | string;
  illustration?: Image;
}
