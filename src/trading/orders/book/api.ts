import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiContext, ApiError, ListRequestQuery, useApi } from '../../../api';
import { OrderBook } from './model';

export interface GetOrderBookQuery extends ListRequestQuery {
  asset?: string;
}

export async function getOrderBook(api: ApiContext, query?: GetOrderBookQuery): Promise<OrderBook> {
  const { data } = await api.get<OrderBook>('/order_book', query);
  return data;
}

export function useOrderBook(
  query: GetOrderBookQuery,
  options?: Omit<UseQueryOptions<OrderBook, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<OrderBook, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<OrderBook, ApiError | AxiosError>(
    ['orders', 'book', query],
    () => getOrderBook(api, query),
    options,
  );
}
