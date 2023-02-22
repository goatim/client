import { Asset } from '../trading';

export type SearchResultType = 'player-asset';

export interface SearchResult {
  type: SearchResultType;
  id: string;
  asset?: Asset;
}

export interface Search {
  results: SearchResult[];
}
