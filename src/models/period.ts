import { Model } from '@cezembre/fronts';
import { DateTime } from 'luxon';

export type PeriodType = 'openings' | 'delivery' | 'collect';

export type TimeSlot = string[];

export default interface Period extends Model {
  type?: PeriodType;
  name?: string;
  description?: string;
  style?: string;
  monday?: TimeSlot[];
  tuesday?: TimeSlot[];
  wednesday?: TimeSlot[];
  thursday?: TimeSlot[];
  friday?: TimeSlot[];
  saturday?: TimeSlot[];
  sunday?: TimeSlot[];
  from?: Date;
  to?: Date;
  is_default?: boolean;
}

export function formatTimeSlot(timeSlot: TimeSlot): string | null {
  if (!timeSlot || timeSlot.length < 2) {
    return null;
  }

  return `entre ${DateTime.fromISO(timeSlot[0]).toLocaleString(
    DateTime.TIME_SIMPLE,
  )} et ${DateTime.fromISO(timeSlot[1]).toLocaleString(DateTime.TIME_SIMPLE)}`;
}
