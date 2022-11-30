import { Model } from '../../api';
import { Image } from '../../medias/image';
import Tax from '../../market/taxes/model';

export interface PackFactoryOdds {
  [key: string]: number;
}

export default interface PackFactory extends Model<'pack_factory'> {
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
