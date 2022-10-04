import Asset from '../../trading/assets/model';
import Booster from '../../trading/boosterFactories/model';
import { OrderType } from '../../trading/orders/model';

export type ItemType = 'order' | 'booster' | 'pack';

export interface OrderItem {
  name?: string;
  nb_shares?: number;
  order_type?: OrderType;
  asset?: Asset | string;
  price_limit?: number;
  booster?: Booster | string;
  unit_price?: number;
  unit_vat?: number;
  total_price?: number;
  total_vat?: number;
}

export interface BoosterItem {
  name?: string;
  quantity?: number;
  booster?: Booster | string;
  unit_price?: number;
  unit_vat?: number;
  total_price?: number;
  total_vat?: number;
  price_limit?: number;
}

export interface PackItem {
  name?: string;
  quantity?: number;
  // pack?: SerializedPack | string;
  unit_price?: number;
  unit_vat?: number;
  total_price?: number;
  total_vat?: number;
  price_limit?: number;
}

export default interface Item {
  id?: string;
  type?: ItemType;
  order?: OrderItem;
  booster?: BoosterItem;
  pack?: PackItem;
}
