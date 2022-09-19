import { useQuery, UseQueryResult } from 'react-query';
import { RequestQuery, useApi } from '../../../api';
import OrdersBook from './model';

export interface GetOrderBookQuery extends RequestQuery {
  asset?: string;
  limit?: number;
}

export function useOrderBook(query: GetOrderBookQuery): UseQueryResult<OrdersBook> {
  const api = useApi();
  return useQuery<OrdersBook>(
    ['orders', 'book', query],
    async () => {
      const { data } = await api.get<OrdersBook>('/order_book', query);
      return data;
    },
    { enabled: !!query?.asset },
  );
}
