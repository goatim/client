import { Model } from '@cezembre/fronts';
import Asset from './asset';
import PhysicalEvent from './physicalEvent';

export default interface Dividend extends Model {
  asset?: Asset;
  physical_event?: PhysicalEvent | string;
  percentage?: number;
  amount?: number;
  nb_donated?: number;
}
