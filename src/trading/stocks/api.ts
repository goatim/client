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

export interface CreateStockBody extends RequestBody {
  asset?: string | null;
  tags?: string | null;
  initial_shares?: number;
}

export function useCreateStock(): UseMutationResult<Stock, unknown, CreateStockBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Stock, unknown, CreateStockBody>(
    async (body: CreateStockBody) => {
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

export interface UpdateStockBody extends RequestBody {
  tags?: string | null;
}

export type UpdateStockVariables = UpdateStockBody & { id: string };

export function useUpdateStock(): UseMutationResult<Stock, unknown, UpdateStockVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Stock, unknown, UpdateStockVariables>(
    async ({ id, ...body }: UpdateStockVariables) => {
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
