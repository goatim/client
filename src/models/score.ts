import { Model } from '@cezembre/fronts';
import { DateTime } from 'luxon';
import Wallet from './wallet';

export default interface Score extends Model {
  wallet?: Wallet | string;
  period?: Score;
  opening?: DateTime;
  closing?: DateTime;
  portfolios_variation?: number;
  boosters_variation?: number;
  dividends_gains?: number;
  total_variation?: number;
}
