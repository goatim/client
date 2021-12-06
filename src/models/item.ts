import Asset from './asset';
import Booster from './booster';

export type ItemType = 'asset_purchase' | 'asset_sell' | 'booster';

export default interface Item {
  id?: string;
  name?: string;
  unit_price?: number;
  unit_vat?: number;
  total_price?: number;
  total_vat?: number;
  price_limit?: number;
  quantity?: number;
  asset?: Asset | string;
  booster?: Booster | string;
  type?: ItemType;
  infos?: string;
}
