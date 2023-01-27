import { Model } from '../../api';
import User from '../users/model';

export default interface Session extends Model<'session'> {
  expiration?: string;
  distribution?: string;
  user?: User | string;
  method?: string;
  device_name?: string;
  bearer_token?: string;
}
