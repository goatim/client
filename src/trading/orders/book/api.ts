import { useQuery, UseQueryResult } from 'react-query';
import { RequestParams, useApi } from '../../../api';
import OrdersBook from './model';

export interface GetOrderBookParams extends RequestParams {
  asset?: string;
  limit?: number;
}

export function useOrderBook(params: GetOrderBookParams): UseQueryResult<OrdersBook> {
  const api = useApi();
  return useQuery<OrdersBook>(
    ['orders', 'book', params],
    async () => {
      const { data } = await api.get<OrdersBook>('/order_book', params);
      return data;
    },
    { enabled: !!params?.asset },
  );
}
