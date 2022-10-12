import { useQuery, UseQueryResult } from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { ListRequestQuery, useApi } from '../../../api';
import OrdersBook from './model';

export interface GetOrderBookQuery extends ListRequestQuery {
  asset?: string;
}

export function useOrderBook(
  query: GetOrderBookQuery,
  options?: UseQueryOptions<OrdersBook>,
): UseQueryResult<OrdersBook> {
  const api = useApi();
  return useQuery<OrdersBook>(
    ['orders', 'book', query],
    async () => {
      const { data } = await api.get<OrdersBook>('/order_book', query);
      return data;
    },
    options,
  );
}
