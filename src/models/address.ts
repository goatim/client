import { Model, GeoLocation } from '@cezembre/fronts';
import City from './city';
import Country from './country';

export interface MinifiedAddress {
  id?: string;
  name?: string;
  is_company?: boolean;
  street_address?: string;
  postal_code?: string;
  city?: string;
  country?: string;
  shipment_infos?: string;
}

export default interface Address extends Model {
  name?: string;
  is_company?: boolean;
  street_address?: string;
  postal_code?: string;
  city?: City | string;
  country?: Country | string;
  google_id?: string;
  serialized?: string;
  neighborhood?: string;
  geo_location?: GeoLocation;
  shipment_infos?: string;
}

export function formatFullAddress(address?: Address | MinifiedAddress | string | null): string {
  if (!address) {
    return '';
  }

  if (typeof address === 'string') {
    return address;
  }

  const lines = [address.street_address];

  if (address.postal_code) {
    lines.push(address.postal_code);
  }

  if (
    address.city &&
    typeof address.city === 'object' &&
    address.city.name &&
    address.city.name.length
  ) {
    if (lines.length <= 1) {
      lines.push(address.city.name);
    } else if (lines[1]) {
      lines[1] += `, ${address.city.name}`;
    }
  }

  return lines.join('\n');
}
