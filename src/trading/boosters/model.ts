import { Model } from '../../api';
import { Portfolio } from '../portfolios';
import { Wallet } from '../../market';
import { Order } from '../orders';
import { BoosterFactory } from '../boosterFactories';
import { Composition } from '../../soccer';

export interface Booster extends Model<'booster'> {
  factory?: BoosterFactory | string;
  wallet?: Wallet | string;
  order?: Order | string;
  portfolio?: Portfolio | string;
  composition?: Composition | string;
  composition_position?: string;
  leverage?: number;
  duration?: number;
  start_quotation?: number;
  stop_quotation?: number;
  gains?: number;
  variation?: number;
  expiration?: string;
  stopped_at?: string;
}
