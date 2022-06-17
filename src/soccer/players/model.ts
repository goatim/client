import { Model } from '../../api';
import Club from '../clubs/model';
import { Image } from '../../medias/image';

export type PlayerPosition =
  | 'goalkeeper'
  | 'fullback'
  | 'center_back'
  | 'sweeper'
  | 'wing_back'
  | 'center_midfield'
  | 'defensive_midfield'
  | 'attacking_midfield'
  | 'wide_midfield'
  | 'center_forward'
  | 'winger'
  | 'second_striker'
  | 'striker';

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
  textual_position?: string;
  number?: number;
}