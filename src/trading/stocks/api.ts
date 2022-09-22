import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useApi, PaginatedList, RequestQuery, RequestBody } from '../../api';
import Stock from './model';

export function useStock(id?: string): UseQueryResult<Stock> {
  const api = useApi();
  return useQuery<Stock>(
    ['stocks', id],
    async () => {
      const { data } = await api.get<Stock>(`/stocks/${id}`);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export type StockList = PaginatedList<'stocks', Stock>;

export interface GetStocksQuery extends RequestQuery {
  asset?: string;
  tags?: string;
}

export function useStocks(query?: GetStocksQuery): UseQueryResult<StockList> {
  const api = useApi();
  return useQuery<StockList>(['stocks', query], async () => {
    const { data } = await api.get<StockList>('/stocks', query);
    return data;
  });
}

export interface PostStockBody extends RequestBody {
  asset?: string | null;
  tags?: string | null;
  initial_shares?: number;
}

export function usePostStock(): UseMutationResult<Stock, unknown, PostStockBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Stock, unknown, PostStockBody>(
    async (body: PostStockBody) => {
      const { data } = await api.post<Stock>('/stocks', body);
      return data;
    },
    {
      onSuccess(stock: Stock) {
        queryClient.setQueryData(['stocks', stock.id], stock);
      },
    },
  );
}

export interface PutStockBody extends RequestBody {
  tags?: string | null;
}

export type PutStockVariables = PutStockBody & { id: string };

export function usePutStock(): UseMutationResult<Stock, unknown, PutStockVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Stock, unknown, PutStockVariables>(
    async ({ id, ...body }: PutStockVariables) => {
      const { data } = await api.put<Stock>(`/stocks/${id}`, body);
      return data;
    },
    {
      onSuccess(stock: Stock) {
        queryClient.setQueryData(['stocks', stock.id], stock);
      },
    },
  );
}
