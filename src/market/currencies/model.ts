import { Model } from '../../api';

export interface Currency extends Model<'currency'> {
  name?: string;
  iso?: string;
  symbol?: string;
  smallest_unit?: string;
}
