import { Model } from '../../api';
import { User } from '../../auth/users/model';
import { Wallet } from '../../market/wallets/model';
import { Asset } from '../../trading/assets/model';
import { Match } from '../../soccer/matches/model';
import { OrderType } from '../../trading/orders/model';
import { Transaction } from '../../trading/transactions/model';
import { Pack } from '../../trading/packs/model';
import { Composition } from '../../soccer/compositions/model';

export interface OrderPostPayload {
  id: string;
  type?: OrderType;
  nb_shares?: number;
  price_limit?: number;
  asset?: Asset | string;
}

export interface TransactionPostPayload {
  transaction?: Transaction | string;
}

export interface PackPostPayload {
  pack?: Pack | string;
}

export interface MatchSummaryPostPayload {
  match?: Match | string;
  podium?: Composition[] | string[];
  self?: Composition | string;
}

export interface PostTypeMap {
  orders: OrderPostPayload[];
  transaction: TransactionPostPayload;
  pack: PackPostPayload;
  match_summary: MatchSummaryPostPayload;
}

export interface Post<T extends keyof PostTypeMap = keyof PostTypeMap> extends Model<'post'> {
  user?: User | string;
  author?: Wallet | string;
  wallet?: Wallet | string;
  publication_date?: string;
  type?: T;
  title?: string;
  slug?: string;
  message?: string;
  payload?: PostTypeMap[T];
}
