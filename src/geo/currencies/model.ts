import { Model } from '@cezembre/fronts';

export default interface Currency extends Model {
  name?: string;
  iso?: string;
  symbol?: string;
  smallest_unit_factor?: number;
}
