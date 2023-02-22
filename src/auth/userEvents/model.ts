import { Session } from '../sessions';
import { Model } from '../../api';
import { User } from '../users';

export interface UserEvent extends Model<'user_event'> {
  user?: User | string;
  session?: Session | string;
  code?: string;
}
