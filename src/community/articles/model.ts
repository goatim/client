import { DateTime } from 'luxon';
import { User } from '../../auth';
import { Paragraph } from '../paragraphs';
import { Model } from '../../api';
import { Image } from '../../medias';

export type ArticleType =
  | 'static'
  | 'article'
  | 'support'
  | 'document'
  | 'legal'
  | 'content'
  | 'unknown';

export interface Article extends Model<'article'> {
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
