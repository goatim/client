import { Model } from '../../api';
import User from '../../auth/users/model';
import Wallet from '../../market/wallets/model';
import Asset from '../../trading/assets/model';
import { OrderType } from '../../trading/orders/model';
import Transaction from '../../trading/transactions/model';
import Pack from '../../trading/packs/model';

export interface PostNewOrderPayload {
  type?: OrderType;
  nb_shares?: number;
  asset?: Asset | string;
}

export interface PostOrderMatchPayload {
  transaction?: Transaction | string;
}

export interface PostNewPackPayload {
  pack?: Pack | string;
}

export interface PostTypeMap {
  new_orders: PostNewOrderPayload[];
  order_match: PostOrderMatchPayload;
  new_pack: PostNewPackPayload;
}

export default interface Post<T extends keyof PostTypeMap = keyof PostTypeMap>
  extends Model<'post'> {
  user?: User | string | null;
  author?: Wallet | string | null;
  wallet?: Wallet | string | null;
  publication_date?: string | null;
  type?: T;
  title?: string | null;
  slug?: string | null;
  message?: string | null;
  payload?: PostTypeMap[T];
}
