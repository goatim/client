import { Address, Country } from '../../geo';
import { Session } from '../sessions';
import { Model } from '../../api';
import { Image } from '../../medias';

export interface User extends Model<'user'> {
  slug?: string;
  email?: string;
  verified_email?: boolean;
  gender?: string;
  first_name?: string;
  last_name?: string;
  pseudo?: string;
  phone?: string;
  verified_phone?: boolean;
  birthday?: Date;
  address?: Address | string;
  country?: Country | string;
  locale?: string;
  referral_code?: string;
  session?: Session;
  picture?: Image;
  xpg?: number;
  level?: number;
  total_xpg?: number;
}
