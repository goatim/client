import { Model } from '../../api';
import { Wallet } from '../../market/wallets/model';
import { Asset } from '../assets/model';

export interface Transaction extends Model<'transaction'> {
  asset?: Asset | string;
  from?: Wallet | string;
  to?: Wallet | string;
  from_stock?: boolean;
  to_stock?: boolean;
  price?: number;
  asset_quotation_gain?: number;
  asset_quotation_variation?: number;
  nb_shares?: number;
}
