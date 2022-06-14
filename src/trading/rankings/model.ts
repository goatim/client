import { Model } from '@cezembre/fronts';
import { DateTime } from 'luxon';
import Rank from '../ranks/model';

export type RankingPeriod =
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
  | 'decade'
  | 'century'
  | 'millennium'
  | 'custom';

export default interface Ranking extends Model {
  name?: string;
  slug?: string;
  description?: string;
  period?: RankingPeriod;
  from?: DateTime;
  to?: DateTime;
  is_default?: boolean;
  ranks?: Rank[];
}
