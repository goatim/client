import { Model } from '../../api';
import { Image } from '../../medias';
import { Tax } from '../../market';

export interface PackFactoryOdds {
  [key: string]: number;
}

export interface PackFactory extends Model<'pack_factory'> {
  name?: string;
  description?: string;
  price?: number;
  vat?: Tax | string;
  tags?: string[];
  stock_tags?: string[];
  odds?: PackFactoryOdds | string;
  breakdown?: number[];
  margin?: number;
  title?: string;
  message?: string;
  icon?: Image;
}
