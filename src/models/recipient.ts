import Address from './address';

export default interface Recipient {
  name?: string;
  phone?: string;
  email?: string;
  address?: Address | string;
  infos?: string;
  message?: string;
}
