import { Model } from '../../api';
import { Wallet } from '../index';

export type WheelDrawType = 'pack' | 'ticket' | 'loss';

export interface WheelDrawResult {
  pack_factory?: string;
  pack?: string;
  ticket?: string;
}

export interface WheelDraw extends Model<'wheel_draw'> {
  wallet?: Wallet | string;
  type?: WheelDrawType;
  result?: WheelDrawResult;
}
