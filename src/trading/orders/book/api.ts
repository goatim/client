import { useQuery, UseQueryResult } from 'react-query';
import { RequestParams, useApi } from '../../../api';
import OrdersBook from './model';

export interface UseOrdersBookParams extends RequestParams {
  asset?: string;
}

export function useOrdersBook(params: UseOrdersBookParams): UseQueryResult<OrdersBook> {
  const api = useApi();
  return useQuery<OrdersBook>(['orders', 'book', params], async () => {
    const { data } = await api.get<OrdersBook>('/orders/book', params);
    return data;
  });
}
