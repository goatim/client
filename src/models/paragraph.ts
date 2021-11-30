import { Model } from '@cezembre/fronts';
import { RawDraftContentState } from 'draft-js';

export type ParagraphType = 'title' | 'text' | 'rich-text' | 'media';

export type ParagraphSize = 'auto' | 'tiny' | 'small' | 'medium' | 'large';

export default interface Paragraph extends Model {
  article?: string;
  type?: ParagraphType;
  size?: ParagraphSize;
  style?: string;
  content?: string | RawDraftContentState;
  position?: number;
}
