import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  ApiContext,
  ApiError,
  ListRequestQuery,
  PaginatedList,
  RequestBody,
  useApi,
} from '../../api';
import { Dividend, DividendType } from './model';

export async function getDividend(api: ApiContext, id: string): Promise<Dividend> {
  const { data } = await api.get<Dividend>(`/dividends/${id}`);
  return data;
}

export function useDividend(
  id?: string,
  options?: Omit<UseQueryOptions<Dividend, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Dividend, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Dividend, ApiError | AxiosError>(
    ['dividends', id],
    () => getDividend(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export interface GetDividendsQuery extends ListRequestQuery {
  asset?: string;
  physical_event?: string;
}

export type DividendList = PaginatedList<'dividends', Dividend>;

export async function getDividends(
  api: ApiContext,
  query?: GetDividendsQuery,
): Promise<DividendList> {
  const { data } = await api.get<DividendList>('/dividends', query);
  return data;
}

export function useDividends(
  query?: GetDividendsQuery,
  options?: Omit<UseQueryOptions<DividendList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<DividendList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<DividendList, ApiError | AxiosError>(
    ['dividends', query],
    async () => getDividends(api, query),
    options,
  );
}

export interface DividendBody extends RequestBody {
  type?: DividendType;
  asset?: string | null;
  physical_event?: string | null;
  percentage?: number | null;
}

export async function postDividend(api: ApiContext, body: DividendBody): Promise<Dividend> {
  const { data } = await api.post<Dividend, DividendBody>('/dividends', body);
  return data;
}

export function usePostDividend(
  options?: Omit<UseMutationOptions<Dividend, ApiError | AxiosError, DividendBody>, 'mutationFn'>,
): UseMutationResult<Dividend, ApiError | AxiosError, DividendBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Dividend, ApiError | AxiosError, DividendBody>(
    (body: DividendBody) => postDividend(api, body),
    {
      onSuccess(dividend: Dividend) {
        queryClient.setQueryData(['dividends', dividend.id], dividend);
      },
      ...options,
    },
  );
}

export async function distributeDividend(api: ApiContext, id: string) {
  const { data } = await api.post<Dividend>(`/dividends/${id}/distribute`);
  return data;
}

export function useDistributeDividend(
  options?: Omit<UseMutationOptions<Dividend, ApiError | AxiosError, string>, 'mutationFn'>,
): UseMutationResult<Dividend, ApiError | AxiosError, string> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Dividend, ApiError | AxiosError, string>((id) => distributeDividend(api, id), {
    onSuccess(dividend: Dividend) {
      queryClient.setQueryData(['dividends', dividend.id], dividend);
    },
    ...options,
  });
}

export async function putDividend(
  api: ApiContext,
  id: string,
  body: DividendBody,
): Promise<Dividend> {
  const { data } = await api.put<Dividend, DividendBody>(`/dividends/${id}`, body);
  return data;
}

export type PutDividendVariables = DividendBody & { id: string };

export function usePutDividend(
  options?: Omit<
    UseMutationOptions<Dividend, ApiError | AxiosError, PutDividendVariables>,
    'mutationFn'
  >,
): UseMutationResult<Dividend, ApiError | AxiosError, PutDividendVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Dividend, ApiError | AxiosError, PutDividendVariables>(
    ({ id, ...body }: PutDividendVariables) => putDividend(api, id, body),
    {
      onSuccess(dividend: Dividend) {
        queryClient.setQueryData(['dividends', dividend.id], dividend);
      },
      ...options,
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

export async function postDividendBulk(
  api: ApiContext,
  body: PostDividendBulkBody,
): Promise<PostDividendBulkResponse> {
  const { data } = await api.post<PostDividendBulkResponse, PostDividendBulkBody>(
    '/dividends/bulk',
    body,
  );
  return data;
}

export function usePostDividendBulk(
  options?: Omit<
    UseMutationOptions<PostDividendBulkResponse, ApiError | AxiosError, PostDividendBulkBody>,
    'mutationFn'
  >,
): UseMutationResult<PostDividendBulkResponse, ApiError | AxiosError, PostDividendBulkBody> {
  const api = useApi();
  return useMutation<PostDividendBulkResponse, ApiError | AxiosError, PostDividendBulkBody>(
    (body: PostDividendBulkBody) => postDividendBulk(api, body),
    options,
  );
}
