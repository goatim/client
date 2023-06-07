import { Model } from '../../api';
import { Wallet } from '../../market';
import { Asset } from '../assets';
import { Booster } from '../boosters';

export interface Portfolio extends Model<'portfolio'> {
  wallet?: Wallet | string;
  asset?: Asset | string;
  buy_price?: number;
  nb_shares?: number;
  valuation?: number;
  gains?: number;
  variation?: number;
  boosters_gains?: number;
  dividends_gains?: number;
  total_gains?: number;
  total_variations?: number;
  boosters?: Booster[];
  bank_proposal?: number;
}
