import Address from '../../geo/addresses/model';
import Country from '../../geo/countries/model';
import Session from '../sessions/model';
import { Model } from '../../api';
import { Image } from '../../medias/image';

export default interface User extends Model<'user'> {
  slug?: string;
  email?: string;
  gender?: string;
  first_name?: string;
  last_name?: string;
  pseudo?: string;
  phone?: string;
  birthday?: Date;
  address?: Address | string;
  country?: Country | string;
  locale?: string;
  session?: Session;
  picture?: Image;
}
