import { Model } from '../../api';
import { Ticket, Wallet } from '../index';

export type WheelDrawType = 'pack' | 'ticket' | 'loss';

export interface WheelDrawResult {
  pack_factory?: string;
  pack?: string;
  ticket?: string;
}

export interface WheelDraw extends Model<'wheel_draw'> {
  wallet?: Wallet | string;
  ticket?: Ticket | string;
  type?: WheelDrawType;
  result?: WheelDrawResult;
}
