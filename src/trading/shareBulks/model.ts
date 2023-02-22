import { Asset } from '../assets';

export interface ShareBulk {
  asset: Asset | string;
  nb_shares: number;
}
