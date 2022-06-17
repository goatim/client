import { Model } from '../../api';

export default interface Currency extends Model {
  name?: string;
  iso?: string;
  symbol?: string;
  smallest_unit_factor?: number;
}
