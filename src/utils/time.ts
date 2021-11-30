import { DateTime } from 'luxon';
import { formatRelativeDate } from '@cezembre/fronts';
import { formatTimeSlot, TimeSlot } from '../models/period';

export type StandardTimeSlot = 'morning' | 'afternoon' | 'evening';

export interface StandardTimeSlotObject {
  name: StandardTimeSlot;
  label: string;
  long_label: string;
  value: TimeSlot;
}

export const standardsTimeSlots: StandardTimeSlotObject[] = [
  {
    name: 'morning',
    label: 'Matin',
    long_label: 'Entre 6h et 13h',
    value: ['06:00', '13:00'],
  },
  {
    name: 'afternoon',
    label: 'Après-midi',
    long_label: 'Entre 13h et 18h',
    value: ['13:00', '18:00'],
  },
  {
    name: 'evening',
    label: 'Soir',
    long_label: 'Entre 18h et 22h',
    value: ['18:00', '22:00'],
  },
];

export function isTimeSlotsEquals(a: TimeSlot, b: TimeSlot): boolean {
  if (!a || !b || a.length !== b.length) {
    return false;
  }

  let equal = true;
  a.forEach((slot, i) => {
    if (slot !== b[i]) {
      equal = false;
    }
  });

  return equal;
}

export function containsTimeSlot(
  haystack: TimeSlot[] | null | undefined,
  needle: TimeSlot,
): boolean {
  if (!haystack) {
    return false;
  }

  let contains = false;
  haystack.forEach((timeSlot) => {
    if (isTimeSlotsEquals(timeSlot, needle)) {
      contains = true;
    }
  });

  return contains;
}

export function removeTimeSlot(
  day: TimeSlot[] | null | undefined,
  timeSlot: TimeSlot,
): TimeSlot[] | null {
  return day ? day.filter((ts: TimeSlot) => !isTimeSlotsEquals(ts, timeSlot)) : null;
}

export function addTimeSlot(day: TimeSlot[] | null | undefined, timeSlot: TimeSlot): TimeSlot[] {
  return day ? [...day, timeSlot] : [timeSlot];
}

export function getCurrentStandardTimeSlot(): StandardTimeSlotObject | undefined {
  const now = DateTime.local();

  return standardsTimeSlots.find(
    (standardTimeSlot: StandardTimeSlotObject) =>
      DateTime.fromISO(standardTimeSlot.value[0]) < now &&
      DateTime.fromISO(standardTimeSlot.value[1]) > now,
  );
}

export function formatDateAndTimeslot(date?: DateTime, timeSlot?: TimeSlot): string | null {
  if (!date && !timeSlot) {
    return null;
  }
  let text = '';

  if (date) {
    text += formatRelativeDate(date);

    if (timeSlot) {
      text += ' ';
    }
  }

  if (timeSlot) {
    text += formatTimeSlot(timeSlot);
  }

  return text;
}
