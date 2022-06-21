import { useQuery, UseQueryResult } from 'react-query';
import { RequestParams, useApi } from '../../../api';
import OrdersBook from './model';

export interface UseOrderBookParams extends RequestParams {
  asset?: string;
  limit?: number;
}

export function useOrderBook(params: UseOrderBookParams): UseQueryResult<OrdersBook> {
  const api = useApi();
  return useQuery<OrdersBook>(
    ['orders', 'book', params],
    async () => {
      const { data } = await api.get<OrdersBook>('/orders/book', params);
      return data;
    },
    { enabled: !!params?.asset },
  );
}
