import { Model } from '../../api';

export type ParagraphType = 'title' | 'text' | 'rich-text' | 'media';

export type ParagraphSize = 'auto' | 'tiny' | 'small' | 'medium' | 'large';

export default interface Paragraph extends Model {
  article?: string;
  type?: ParagraphType;
  size?: ParagraphSize;
  style?: string;
  content?: string;
  position?: number;
}
