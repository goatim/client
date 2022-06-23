import { OrderType } from './model';
import Asset from '../assets/model';

export type OrderEvent = 'create_order' | 'update_order' | 'delete_order' | 'match_order';

export interface MatchOrderEventPayload {
  type?: OrderType;
  nb_matched?: number;
  total?: number;
  asset?: Asset;
}
