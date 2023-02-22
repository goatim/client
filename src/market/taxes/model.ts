import { Model } from '../../api';

export interface Tax extends Model<'tax'> {
  tags?: string[];
  name?: string;
  amount?: number;
  currency?: string;
  percentage?: number;
}
