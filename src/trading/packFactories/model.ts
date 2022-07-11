import { Model } from '../../api';
import { Image } from '../../medias/image';

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
  title?: string;
  message?: string;
  icon?: Image;
}
