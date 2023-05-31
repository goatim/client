import { Asset, BoosterFactory, OrderType, PackFactory } from '../../trading';

export type ItemType = 'order' | 'booster' | 'pack';

export interface ItemPrice {
  unit_price?: number;
  unit_vat?: number;
  total_price?: number;
  total_vat?: number;
}

export interface OrderItem {
  name?: string;
  nb_shares?: number;
  order_type?: OrderType;
  asset?: Asset | string;
  price_limit?: number;
  booster_factory?: BoosterFactory | string;
}

export interface BoosterItem {
  name?: string;
  booster_factory?: BoosterFactory | string;
}

export interface PackItem {
  name?: string;
  pack_factory?: PackFactory | string;
}

export interface Item extends ItemPrice {
  id?: string;
  type?: ItemType;
  quantity?: number;
  order?: OrderItem;
  booster?: BoosterItem;
  pack?: PackItem;
}
