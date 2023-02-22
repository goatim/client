import { League } from '../leagues/model';
import { Club } from '../clubs/model';
import { Asset } from '../../trading/assets/model';
import { Image } from '../../medias/image';
import { Model } from '../../api';

export type SpotlightType = 'simple' | 'duo';

export interface Spotlight extends Model<'spotlight'> {
  tags?: string[];
  type?: SpotlightType;
  subtitle?: string;
  title?: string;
  description?: string;
  primary_color?: string;
  secondary_color?: string;
  club?: Club | string;
  league?: League | string;
  primary_assets?: (Asset | string)[];
  secondary_assets?: (Asset | string)[];
  illustration?: Image;
  resolved_primary_color?: string;
  resolved_secondary_color?: string;
  resolved_primary_assets?: (Asset | string)[];
  resolved_secondary_assets?: (Asset | string)[];
  resolved_illustration?: Image;
}
