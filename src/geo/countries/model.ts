import { Model } from '../../api';
import { GeoLocation } from '../addresses/model';
import Currency from '../../market/currencies/model';

export default interface Country extends Model<'country'> {
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
