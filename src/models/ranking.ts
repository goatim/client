import { Model } from '@cezembre/fronts';
import { DateTime } from 'luxon';

export type RankingPeriod = 'day' | 'week' | 'month' | 'season' | 'year' | 'custom';

export default interface Ranking extends Model {
  name?: string;
  slug?: string;
  description?: string;
  period?: RankingPeriod;
  from?: DateTime;
  to?: DateTime;
}
