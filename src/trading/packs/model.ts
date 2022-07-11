import { Model } from '../../api';
import Wallet from '../../market/wallets/model';
import PackFactory from '../packFactories/model';
import ShareBulk from '../shareBulks/model';
import MinifiedShareBulk from '../shareBulks/minified';

export default interface Pack extends Model {
  factory?: PackFactory | string;
  wallet?: Wallet | string;
  share_bulks?: ShareBulk[] | MinifiedShareBulk[] | string;
  tags?: string[];
  seen?: boolean;
  title?: string;
  message?: string;
  targeted_valuation?: number;
  valuation?: number;
}
