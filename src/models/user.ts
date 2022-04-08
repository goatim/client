import { Image, Model } from '@cezembre/fronts';
import Address from './address';
import Country from './country';

export default interface User extends Model {
  slug?: string;
  email?: string;
  picture?: Image;
  gender?: string;
  first_name?: string;
  last_name?: string;
  pseudo?: string;
  phone?: string;
  birthday?: Date;
  address?: Address | string;
  country?: Country | string;
  locale?: string;
}
