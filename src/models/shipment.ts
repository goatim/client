import { Model } from '@cezembre/fronts';
import { DateTime } from 'luxon';
import Address from './address';
import { TimeSlot } from './period';
import Item from './item';
import Tax from './tax';

export type ShipmentStatus =
  | 'created'
  | 'accepted'
  | 'ready'
  | 'delivering'
  | 'cancelled'
  | 'delivered'
  | 'missed'
  | 'archived'
  | 'errored';

export default interface Shipment extends Model {
  order?: string;
  user?: string;
  invoice?: string;
  items?: Item[];
  total_items?: number;
  items_prices?: number;
  items_vats?: number;
  total_amount?: number;
  address?: Address | string;
  phone?: string;
  infos?: string;
  wished_date?: DateTime;
  wished_time_slot?: TimeSlot;
  expected_time?: DateTime;
  price?: number;
  vat?: Tax | string;
  status?: ShipmentStatus;
}

export function formatShipmentStatus(status?: ShipmentStatus): string {
  switch (status) {
    case 'created':
    case 'accepted':
      return 'Livraison à venir';

    case 'ready':
      return 'Prêt à être livré';

    case 'delivering':
      return 'Livraison en cours';

    case 'delivered':
      return 'Commande livrée';

    case 'missed':
      return 'Livraison reportée';

    default:
      return 'Livraison';
  }
}
