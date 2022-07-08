import { Model } from '../../api';
import Asset from '../assets/model';

export default interface Stock extends Model {
  asset?: Asset | string;
  tags?: string[];
  initial_shares?: number;
  nb_shares?: number;
}
