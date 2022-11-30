import { DateTime } from 'luxon';
import { Model } from '../../api';
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

export default interface Ranking extends Model<'ranking'> {
  name?: string;
  slug?: string;
  description?: string;
  period?: RankingPeriod;
  from?: DateTime;
  to?: DateTime;
  is_default?: boolean;
  ranks?: Rank[];
}
