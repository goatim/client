import { Model } from '../../api';
import { Tax } from '../../market';

export interface BoosterFactory extends Model<'booster_factory'> {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  vat?: Tax | string;
  leverage?: number;
  duration?: number;
  nb_in_wallet?: number;
}
