import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useApi, RequestBody, PaginatedList, RequestQuery } from '../../api';
import Dividend, { DividendType } from './model';

export function useDividend(id?: string): UseQueryResult<Dividend> {
  const api = useApi();
  return useQuery<Dividend>(['dividends', id], async () => {
    const { data } = await api.get<Dividend>(`/dividends/${id}`);
    return data;
  });
}

export interface GetDividendsQuery extends RequestQuery {
  physical_event: string;
}

export type DividendList = PaginatedList<'dividends', Dividend>;

export function useDividends(query?: GetDividendsQuery): UseQueryResult<DividendList> {
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
  percentage?: string | null;
}

export function useCreateDividend(): UseMutationResult<Dividend, unknown, DividendBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Dividend, unknown, DividendBody>(
    async (body: DividendBody) => {
      const { data } = await api.post<Dividend>('/dividends', body);
      return data;
    },
    {
      onSuccess(dividend: Dividend) {
        queryClient.setQueryData(['dividends', dividend.id], dividend);
      },
    },
  );
}

export function useDistributeDividend(
  dividendId: string,
): UseMutationResult<Dividend, unknown, void> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Dividend, unknown, void>(
    async () => {
      const { data } = await api.post<Dividend>(`/dividends/${dividendId}/distribute`);
      return data;
    },
    {
      onSuccess(dividend: Dividend) {
        queryClient.setQueryData(['dividends', dividend.id], dividend);
      },
    },
  );
}

export type UpdateDividendVariables = DividendBody & { id: string };

export function useUpdateDividend(): UseMutationResult<Dividend, unknown, UpdateDividendVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Dividend, unknown, UpdateDividendVariables>(
    async ({ id, ...body }: UpdateDividendVariables) => {
      const { data } = await api.put<Dividend>(`/dividends/${body}`, body);
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
      const { data } = await api.post<PostDividendBulkResponse>('/dividends/bulk', body);
      return data;
    },
  );
}
