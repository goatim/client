import { Model } from '../../api';
import Club from '../clubs/model';
import { Image } from '../../medias/image';

export type PlayerPosition = 'goalkeeper' | 'defender' | 'midfielder' | 'forward';

export type PlayerSide = 'center' | 'left' | 'right';

export default interface Player extends Model {
  club?: Club | string;
  name?: string;
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
