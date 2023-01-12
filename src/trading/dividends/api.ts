import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { useApi, PaginatedList, ListRequestQuery, RequestBody } from '../../api';
import Dividend, { DividendType } from './model';

export function useDividend(id?: string): UseQueryResult<Dividend> {
  const api = useApi();
  return useQuery<Dividend>(['dividends', id], async () => {
    const { data } = await api.get<Dividend>(`/dividends/${id}`);
    return data;
  });
}

export interface GetDividendsQuery extends ListRequestQuery {
  physical_event?: string;
}

export type DividendList = PaginatedList<'dividends', Dividend>;

export function useDividends(
  query?: GetDividendsQuery,
  options?: UseQueryOptions<DividendList>,
): UseQueryResult<DividendList> {
  const api = useApi();
  return useQuery<DividendList>(['dividends', query], async () => {
    const { data } = await api.get<DividendList>('/dividends', query);
    return data;
  });
}

export interface DividendBody extends RequestBody {
  type?: DividendType;
  asset?: string | null;
  physical_event?: string | null;
  percentage?: number | null;
}

export function usePostDividend(): UseMutationResult<Dividend, unknown, DividendBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Dividend, unknown, DividendBody>(
    async (body: DividendBody) => {
      const { data } = await api.post<Dividend, DividendBody>('/dividends', body);
      return data;
    },
    {
      onSuccess(dividend: Dividend) {
        queryClient.setQueryData(['dividends', dividend.id], dividend);
      },
    },
  );
}

export function useDistributeDividend(): UseMutationResult<Dividend, unknown, string> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Dividend, unknown, string>(
    async (id) => {
      const { data } = await api.post<Dividend>(`/dividends/${id}/distribute`);
      return data;
    },
    {
      onSuccess(dividend: Dividend) {
        queryClient.setQueryData(['dividends', dividend.id], dividend);
      },
    },
  );
}

export type PutDividendVariables = DividendBody & { id: string };

export function usePutDividend(): UseMutationResult<Dividend, unknown, PutDividendVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Dividend, unknown, PutDividendVariables>(
    async ({ id, ...body }: PutDividendVariables) => {
      const { data } = await api.put<Dividend, DividendBody>(`/dividends/${id}`, body);
      return data;
    },
    {
      onSuccess(dividend: Dividend) {
        queryClient.setQueryData(['dividends', dividend.id], dividend);
      },
    },
  );
}

export interface PostDividendBulkBody extends RequestBody {
  bulk: File;
  physical_event?: string;
}

export interface PostDividendBulkResponse {
  created: number;
}

export function usePostDividendBulk(): UseMutationResult<
  PostDividendBulkResponse,
  unknown,
  PostDividendBulkBody
> {
  const api = useApi();
  return useMutation<PostDividendBulkResponse, unknown, PostDividendBulkBody>(
    async (body: PostDividendBulkBody) => {
      const { data } = await api.post<PostDividendBulkResponse, PostDividendBulkBody>(
        '/dividends/bulk',
        body,
      );
      return data;
    },
  );
}
