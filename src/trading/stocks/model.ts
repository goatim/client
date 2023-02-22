import { Model } from '../../api';
import { Asset } from '../assets/model';

export interface Stock extends Model<'stock'> {
  asset?: Asset | string;
  tags?: string[];
  initial_shares?: number;
  nb_shares?: number;
}
