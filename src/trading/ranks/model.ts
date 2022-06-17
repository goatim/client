import { Model } from '../../api';
import Ranking from '../rankings/model';

export default interface Rank extends Model {
  ranking?: Ranking | string;
  name?: string;
  slug?: string;
  description?: string;
  level?: number;
  ceiling?: number;
  position?: number;
}
