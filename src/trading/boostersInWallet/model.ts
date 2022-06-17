import { Model } from '../../api';
import Wallet from '../../market/wallets/model';
import Booster from '../boosters/model';

export default interface BoosterInWallet extends Model {
  booster?: Booster | string;
  wallet?: Wallet | string;
  quantity?: number;
  leverage?: number;
}
