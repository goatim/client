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
import { Stock } from './model';

export async function getStock(api: ApiContext, id: string): Promise<Stock> {
  const { data } = await api.get<Stock>(`/stocks/${id}`);
  return data;
}

export function useStock(
  id?: string,
  options?: Omit<UseQueryOptions<Stock, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Stock, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Stock, ApiError | AxiosError>(['stocks', id], () => getStock(api, id as string), {
    ...options,
    enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
  });
}

export type StockList = PaginatedList<'stocks', Stock>;

export interface GetStocksQuery extends ListRequestQuery {
  asset?: string;
  tags?: string;
}

export async function getStocks(api: ApiContext, query?: GetStocksQuery): Promise<StockList> {
  const { data } = await api.get<StockList>('/stocks', query);
  return data;
}

export function useStocks(
  query?: GetStocksQuery,
  options?: Omit<UseQueryOptions<StockList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<StockList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<StockList, ApiError | AxiosError>(
    ['stocks', query],
    () => getStocks(api, query),
    options,
  );
}

export interface PostStockBody extends RequestBody {
  asset?: string | null;
  tags?: string | null;
  initial_shares?: number;
}

export async function postStock(api: ApiContext, body: PostStockBody): Promise<Stock> {
  const { data } = await api.post<Stock, PostStockBody>('/stocks', body);
  return data;
}

export function usePostStock(
  options?: Omit<UseMutationOptions<Stock, ApiError | AxiosError, PostStockBody>, 'mutationFn'>,
): UseMutationResult<Stock, ApiError | AxiosError, PostStockBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Stock, ApiError | AxiosError, PostStockBody>(
    (body: PostStockBody) => postStock(api, body),
    {
      onSuccess(stock: Stock) {
        queryClient.setQueryData(['stocks', stock.id], stock);
      },
      ...options,
    },
  );
}

export interface PutStockBody extends RequestBody {
  tags?: string | null;
}

export async function putStock(api: ApiContext, id: string, body: PutStockBody): Promise<Stock> {
  const { data } = await api.put<Stock, PostStockBody>(`/stocks/${id}`, body);
  return data;
}

export type PutStockVariables = PutStockBody & { id: string };

export function usePutStock(
  options?: Omit<UseMutationOptions<Stock, ApiError | AxiosError, PutStockVariables>, 'mutationFn'>,
): UseMutationResult<Stock, ApiError | AxiosError, PutStockVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Stock, ApiError | AxiosError, PutStockVariables>(
    ({ id, ...body }: PutStockVariables) => putStock(api, id, body),
    {
      onSuccess(stock: Stock) {
        queryClient.setQueryData(['stocks', stock.id], stock);
      },
      ...options,
    },
  );
}
