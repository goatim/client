import { Model } from '@cezembre/fronts';
import Ranking from './ranking';

export default interface Rank extends Model {
  ranking?: Ranking | string;
  name?: string;
  slug?: string;
  description?: string;
  level?: number;
}
