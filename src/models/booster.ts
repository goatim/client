import { Model } from '@cezembre/fronts';
import Tax from './tax';

export default interface Booster extends Model {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  vat?: Tax | string;
  leverage?: number;
  nb_in_wallet?: number;
}
