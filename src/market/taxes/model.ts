import { Model } from '../../api';

export default interface Tax extends Model<'tax'> {
  tags?: string[];
  name?: string;
  amount?: number;
  currency?: string;
  percentage?: number;
}
