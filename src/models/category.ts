import { Image, Model } from '@cezembre/fronts';

export default interface Category extends Model {
  slug?: string;
  shop?: string;
  is_active?: boolean;
  name?: string;
  icon?: string;
  description?: string;
  parent?: string;
  position?: number;
  locale?: string;
  children?: Category[];
  illustrations?: Image[];
}
