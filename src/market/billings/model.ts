import { Model } from '@cezembre/fronts';
import Address, { MinifiedAddress } from '../../geo/addresses/model';

export interface MinifiedBilling {
  id?: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  email?: string;
  phone?: string;
  address?: MinifiedAddress | string;
  vat_code?: string;
}

export default interface Billing extends Model {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  email?: string;
  phone?: string;
  address?: Address | string;
  vat_code?: string;
  is_default?: boolean;
}
