import { Asset, BoosterFactory, OrderType, PackFactory } from '../../trading';

export type ItemType = 'order' | 'booster' | 'pack';

export interface OrderItem {
  name?: string;
  nb_shares?: number;
  order_type?: OrderType;
  asset?: Asset | string;
  price_limit?: number;
  booster_factory?: BoosterFactory | string;
  unit_price?: number;
  unit_vat?: number;
  total_price?: number;
  total_vat?: number;
}

export interface BoosterItem {
  name?: string;
  quantity?: number;
  booster_factory?: BoosterFactory | string;
  unit_price?: number;
  unit_vat?: number;
  total_price?: number;
  total_vat?: number;
  price_limit?: number;
}

export interface PackItem {
  name?: string;
  quantity?: number;
  pack_factory?: PackFactory | string;
  unit_price?: number;
  unit_vat?: number;
  total_price?: number;
  total_vat?: number;
  price_limit?: number;
}

export interface Item {
  id?: string;
  type?: ItemType;
  order?: OrderItem;
  booster?: BoosterItem;
  pack?: PackItem;
}
