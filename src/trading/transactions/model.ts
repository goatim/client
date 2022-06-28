import { Model } from '../../api';
import Wallet from '../../market/wallets/model';
import Asset from '../assets/model';

export default interface Transaction extends Model {
  asset?: Asset | string;
  from?: Wallet | string;
  to?: Wallet | string;
  price?: number;
  asset_quotation_gain?: number;
  asset_quotation_variation?: number;
  nb_shares?: number;
}
