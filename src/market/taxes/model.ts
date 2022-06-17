import { Model } from '../../api';

export default interface Tax extends Model {
  tags?: string[];
  name?: string;
  amount?: number;
  currency?: string;
  percentage?: number;
}
