import { Model } from '../../api';
import { Wallet } from '../../market';
import { PackFactory } from '../packFactories';
import { ShareBulk, MinifiedShareBulk } from '../shareBulks';
import { Image } from '../../medias';

export interface Pack extends Model<'pack'> {
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
