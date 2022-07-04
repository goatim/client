import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useApi, PaginatedList, RequestParams, RequestBody } from '../../api';
import Stock, { StockType } from './model';

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

export interface GetStocksParams extends RequestParams {
  asset?: string;
  type?: StockType;
  tags?: string;
}

export function useStocks(params?: GetStocksParams): UseQueryResult<StockList> {
  const api = useApi();
  return useQuery<StockList>(['stocks', params], async () => {
    const { data } = await api.get<StockList>('/stocks', params);
    return data;
  });
}

export interface CreateStockBody extends RequestBody {
  asset?: string;
  type?: string;
  tags?: string;
  initial_shares?: string;
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
  type?: string;
  tags?: string;
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
