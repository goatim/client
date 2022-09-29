import { useQuery, UseQueryResult } from 'react-query';
import { useApi, ListRequestQuery } from '../api';
import Search from './model';

export interface SearchQuery extends ListRequestQuery {
  q: string;
  types?: string;
}

export function useSearch(query: SearchQuery): UseQueryResult<Search> {
  const api = useApi();
  return useQuery<Search>(
    ['search', query],
    async () => {
      const { data } = await api.get<Search>('/search', query);
      return data;
    },
    { enabled: !!query.query },
  );
}
