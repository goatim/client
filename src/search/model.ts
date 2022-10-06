import Asset from '../trading/assets/model';

export type SearchResultType = 'player-asset';

export interface SearchResult {
  type: SearchResultType;
  id: string;
  asset?: Asset;
}

export default interface Search {
  results: SearchResult[];
}