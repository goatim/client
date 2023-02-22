import { Model } from '../../api';
import { Ranking } from '../rankings';

export interface Rank extends Model<'rank'> {
  ranking?: Ranking | string;
  name?: string;
  slug?: string;
  description?: string;
  level?: number;
  ceiling?: number;
  position?: number;
}
