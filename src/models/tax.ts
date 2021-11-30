import { Model } from '@cezembre/fronts';

export default interface Tax extends Model {
  tags?: string[];
  name?: string;
  amount?: number;
  currency?: string;
  percentage?: number;
}
