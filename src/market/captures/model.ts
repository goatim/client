import { Model } from '../../api';
import Wallet from '../wallets/model';

export type CaptureStatus = 'created' | 'cancelled' | 'processed' | 'errored';

export default interface Capture extends Model {
  wallet?: Wallet | string;
  amount?: number;
  status?: CaptureStatus;
}