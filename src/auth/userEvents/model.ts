import { Session } from '../sessions/model';
import { Model } from '../../api';
import { User } from '../users/model';

export interface UserEvent extends Model<'user_event'> {
  user?: User | string;
  session?: Session | string;
  code?: string;
}
