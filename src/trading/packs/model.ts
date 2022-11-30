import { Model } from '../../api';
import Wallet from '../../market/wallets/model';
import PackFactory from '../packFactories/model';
import ShareBulk from '../shareBulks/model';
import MinifiedShareBulk from '../shareBulks/minified';
import { Image } from '../../medias/image';

export default interface Pack extends Model<'pack'> {
  factory?: PackFactory | string;
  wallet?: Wallet | string;
  share_bulks?: ShareBulk[] | MinifiedShareBulk[] | string;
  tags?: string[];
  seen?: boolean;
  title?: string;
  message?: string;
  targeted_valuation?: number;
  valuation?: number;
  icon?: Image;
  resolved_icon?: Image;
  resolved_title?: string;
  resolved_message?: string;
}
