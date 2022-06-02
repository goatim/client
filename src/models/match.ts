import { Image, Model, ApiListResponse } from '@cezembre/fronts';
import Wallet from './wallet';
import Composition from './composition';

export type MatchStatus = 'planned' | 'ongoing' | 'passed' | 'cancelled';

export default interface Match extends Model {
  creator?: Wallet | string;
  title?: string;
  slug?: string;
  description?: string;
  beginning?: string;
  end?: string;
  is_public?: boolean;
  status?: MatchStatus;
  icon?: Image;
  compositions?: ApiListResponse<'compositions', Composition>;
}
