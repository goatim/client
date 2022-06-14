import { DateTime } from 'luxon';
import { Image, Model } from '@cezembre/fronts';
import User from '../../auth/users/model';
import Paragraph from '../paragraphs/model';

export type ArticleType =
  | 'static'
  | 'article'
  | 'support'
  | 'document'
  | 'legal'
  | 'content'
  | 'unknown';

export default interface Article extends Model {
  publication?: DateTime;
  is_published?: boolean;
  type?: ArticleType;
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
