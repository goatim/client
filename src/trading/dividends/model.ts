import { Model } from '../../api';
import Asset from '../assets/model';
import PhysicalEvent from '../../soccer/physicalEvents/model';

export default interface Dividend extends Model {
  asset?: Asset | string;
  physical_event?: PhysicalEvent | string;
  percentage?: number;
  amount?: number;
  nb_distributed?: number;
}
