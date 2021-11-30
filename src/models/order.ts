import { Model } from '@cezembre/fronts';
import Shop from './shop';
import User from './user';
import Item from './item';
import Shipment from './shipment';
import Collect from './collect';

export type OrderType = 'shipment' | 'collect';

export type OrderStatus =
  | 'unknown'
  | 'created'
  | 'confirmed'
  | 'accepted'
  | 'preparing'
  | 'ready'
  | 'cancelled'
  | 'delivered'
  | 'archived'
  | 'errored';

export default interface Order extends Model {
  invoice?: string;
  user?: User | string;
  shop?: Shop | string;
  items?: Item[];
  total_items?: number;
  items_prices?: number;
  items_vats?: number;
  shipments_prices?: number;
  shipments_vats?: number;
  total_amount?: number;
  currency?: string;
  type?: OrderType;
  status?: OrderStatus;
  shipments?: Shipment[];
  collects?: Collect[];
  message?: string;
  infos?: string;
}

export function formatOrderStatus(status?: OrderStatus): string | null {
  switch (status) {
    case 'created':
    case 'confirmed':
      return "Commande en cours d'acceptation";

    case 'accepted':
      return 'Commande acceptée';

    case 'preparing':
      return 'Commande en préparation';

    case 'ready':
      return 'Commande prête';

    case 'cancelled':
      return 'Commande annulée';

    case 'errored':
      return 'Problème dans la commande';

    default:
      return `Commande`;
  }
}
