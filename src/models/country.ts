import { Model, GeoLocation } from '@cezembre/fronts';
import Currency from './currency';

export default interface Country extends Model {
  currency?: Currency | string;
  coordinates?: GeoLocation | string;
  name?: string;
  slug?: string;
  short_name?: string;
  description?: string;
  phone_indicator?: string;
  locale?: string;
  iso2?: string;
  iso3?: string;
  flag?: string;
}
