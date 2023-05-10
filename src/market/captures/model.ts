import { Model } from '../../api';
import { Wallet } from '../wallets';

export type CaptureStatus = 'created' | 'cancelled' | 'processed' | 'errored';

export interface Capture extends Model<'capture'> {
  wallet?: Wallet | string;
  coins?: number;
  status?: CaptureStatus;
}
