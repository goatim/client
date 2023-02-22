import { DateTime } from 'luxon';
import { Wallet } from '../../market/wallets/model';

export interface Score {
  wallet?: Wallet | string;
  date?: DateTime;
  portfolios_gains?: number;
  boosters_gains?: number;
  dividends_gains?: number;
  total_gains?: number;
}
