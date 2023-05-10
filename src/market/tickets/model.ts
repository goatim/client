import { Model } from '../../api';
import { Wallet } from '../index';

export type TicketSource = 'daily' | 'wheel';

export interface Ticket extends Model<'ticket'> {
  wallet?: Wallet | string;
  source?: TicketSource;
  used?: boolean;
}
