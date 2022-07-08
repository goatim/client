import { Model } from '../../api';

export interface PackFactoryOdds {
  [key: string]: number;
}

export default interface PackFactory extends Model {
  name?: string;
  description?: string;
  tags?: string[];
  stock_tags?: string[];
  odds?: PackFactoryOdds | string;
  breakdown?: number[];
  margin?: number;
}
