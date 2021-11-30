import { DateTime } from 'luxon';
import { Image, Model } from '@cezembre/fronts';
import User from './user';
import Paragraph from './paragraph';

export default interface Article extends Model {
  publication?: DateTime;
  is_published?: boolean;
  type?: string;
  author?: User | string;
  title?: string;
  slug?: string;
  refs?: string[];
  tags?: string[];
  description?: string;
  keywords?: string[];
  language?: string;
  position?: number;
  illustration?: Image;
  paragraphs?: Paragraph[];
  locale?: string;
}
