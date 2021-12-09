import { Model } from '@cezembre/fronts';

export default interface Rank extends Model {
  name?: string;
  slug?: string;
  description?: string;
  level?: number;
}
