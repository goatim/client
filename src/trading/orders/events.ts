import { OrderType } from './model';
import Asset from '../assets/model';

export type OrderEvent = 'create_order' | 'update_order' | 'delete_order' | 'order_match';

export interface OrderMatchEventPayload {
  type?: OrderType;
  nb_matched?: number;
  total?: number;
  asset?: Asset;
}
