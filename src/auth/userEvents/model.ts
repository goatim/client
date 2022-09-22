import Session from '../sessions/model';
import { Model } from '../../api';
import User from '../users/model';

export default interface UserEvent extends Model {
  user?: User | string;
  session?: Session | string;
  code?: string;
}
