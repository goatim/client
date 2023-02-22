import { useQuery, UseQueryResult } from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { AxiosError } from 'axios';
import { ApiContext, ApiError, ListRequestQuery, useApi } from '../api';
import { Search } from './model';

export interface SearchQuery extends ListRequestQuery {
  q?: string;
  types?: string;
}

export async function getSearch(
  api: ApiContext,
  q: string,
  query?: Omit<SearchQuery, 'q'>,
): Promise<Search> {
  const { data } = await api.get<Search, SearchQuery>('/search', { q, ...query });
  return data;
}

export function useSearch(
  q?: string,
  query?: Omit<SearchQuery, 'q'>,
  options?: Omit<UseQueryOptions<Search, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Search, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Search, ApiError | AxiosError>(
    ['search', q, query],
    () => getSearch(api, q as string, query),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!q : !!q,
    },
  );
}
