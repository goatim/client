import { Asset } from '../assets/model';

export interface ShareBulk {
  asset: Asset | string;
  nb_shares: number;
}
