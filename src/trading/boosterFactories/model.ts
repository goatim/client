import { Model } from '../../api';
import Tax from '../../market/taxes/model';

export default interface BoosterFactory extends Model {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  vat?: Tax | string;
  leverage?: number;
  duration?: number;
  nb_in_wallet?: number;
}
