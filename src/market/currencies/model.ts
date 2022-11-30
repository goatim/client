import { Model } from '../../api';

export default interface Currency extends Model<'currency'> {
  name?: string;
  iso?: string;
  symbol?: string;
  smallest_unit?: string;
}
