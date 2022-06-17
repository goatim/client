import { DateTime } from 'luxon';
import User from '../../auth/users/model';
import Paragraph from '../paragraphs/model';
import { Model } from '../../api';
import { Image } from '../../medias/image';

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
