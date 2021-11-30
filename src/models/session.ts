import { Model } from '@cezembre/fronts';

export default interface Session extends Model {
  expiration?: string;
  distribution?: string;
  user?: string;
  method?: string;
  device_name?: string;
  bearer_token?: string;
}
