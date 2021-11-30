import { Image, Model, GeoLocation } from '@cezembre/fronts';
import { DateTime } from 'luxon';
import Shop from './shop';
import Category from './category';
import Tax from './tax';

export type ProductAvailability = 'day' | 'season' | 'forever';

export default interface Product extends Model {
  slug?: string;
  name?: string;
  description?: string;
  locale?: string;

  category?: Category | string;

  shop?: Shop | string;

  price?: number;

  vat?: Tax | string;

  /**
   * Shipment
   */

  package_length?: number;
  package_width?: number;
  package_height?: number;
  package_weight?: number;

  preparation_time?: number;

  stock?: number;
  availability?: ProductAvailability;
  expiration?: DateTime;

  illustrations?: Image[];

  geo_location?: GeoLocation;

  reservations?: number;

  distance?: number;

  is_expired?: boolean;
  is_active?: boolean;
  is_available?: boolean;
}
