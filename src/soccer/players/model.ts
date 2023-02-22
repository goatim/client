import { Model } from '../../api';
import { Club } from '../clubs';
import { Image } from '../../medias';

export type PlayerPosition = 'goalkeeper' | 'defender' | 'midfielder' | 'forward';

export type PlayerSide = 'center' | 'left' | 'right';

export interface Player extends Model<'player'> {
  club?: Club | string;
  first_name?: string;
  last_name?: string;
  picture?: Image;
  nickname?: string;
  slug?: string;
  description?: string;
  position?: PlayerPosition;
  side?: PlayerSide;
  number?: number;
  resolved_position?: string;
  resolved_short_position?: string;
}
