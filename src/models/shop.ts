import { Image, Model, GeoLocation } from '@cezembre/fronts';
import User from './user';
import Address from './address';

export default interface Shop extends Model {
  is_default?: boolean;
  slug?: string;
  owner?: User | string;
  name?: string;
  description?: string;
  address?: Address | string;
  geo_location?: GeoLocation;
  phone?: string;
  do_shipments?: boolean;
  shipping_perimeter?: number;
  siret?: string;
  iban?: string;
  bic?: string;
  vat_code?: string;
  currency?: string;
  is_valid?: boolean;
  is_active?: boolean;
  is_open?: boolean;
  illustrations?: Image[];
}
