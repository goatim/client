import { Model } from '@cezembre/fronts';
import Address from './address';
import Country from './country';

export default interface User extends Model {
  email?: string;
  gender?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  birthday?: Date;
  address?: Address | string;
  country?: Country | string;
  locale?: string;
}
