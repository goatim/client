import { Model } from '../../api';
import { Address, MinifiedAddress } from '../../geo';

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

export interface Billing extends Model<'billing'> {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  email?: string;
  phone?: string;
  address?: Address | string;
  vat_code?: string;
  is_default?: boolean;
}
