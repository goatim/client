import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { ListRequestQuery, PaginatedList, useApi } from '../../api';
import Order, { OrderType } from './model';
import { useCurrentWallet } from '../../market/wallets/api';

export function useOrder(id?: string): UseQueryResult<Order> {
  const api = useApi();
  return useQuery<Order>(
    ['orders', id],
    async () => {
      const { data } = await api.get<Order>(`/orders/${id}`);
      return data;
    },
    { enabled: !!id },
  );
}

export type OrderList = PaginatedList<'orders', Order>;

export interface GetOrdersQuery extends ListRequestQuery {
  wallet?: string;
}

export function useOrders(
  query?: GetOrdersQuery,
  options?: UseQueryOptions<OrderList>,
): UseQueryResult<OrderList> {
  const api = useApi();
  return useQuery<OrderList>(
    ['orders', query],
    async () => {
      const { data } = await api.get<OrderList>('/orders', query);
      return data;
    },
    options,
  );
}

export function useCurrentWalletOrders(
  query?: Omit<GetOrdersQuery, 'wallet'>,
): UseQueryResult<OrderList> {
  const wallet = useCurrentWallet();
  return useOrders({
    ...query,
    wallet: wallet.data?.id || 'default',
  });
}

export interface OrderBody {
  wallet?: string | null;
  asset?: string | null;
  type?: OrderType;
  price_limit?: number;
  nb_shares?: number;
  is_cancelled?: boolean;
}

export function usePostOrder(): UseMutationResult<Order, unknown, OrderBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Order, unknown, OrderBody>(
    async (body: OrderBody) => {
      const { data } = await api.post<Order, OrderBody>('/orders', body);
      return data;
    },
    {
      onSuccess(order: Order) {
        queryClient.setQueryData(['orders', order.id], order);
      },
    },
  );
}

export type PutOrderVariables = OrderBody & { id: string };

export function usePutOrder(): UseMutationResult<Order, unknown, PutOrderVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Order, unknown, PutOrderVariables>(
    async ({ id, ...body }: PutOrderVariables) => {
      const { data } = await api.put<Order, OrderBody>(`/orders/${id}`, body);
      return data;
    },
    {
      onSuccess(order: Order) {
        queryClient.setQueryData(['orders', order.id], order);
      },
    },
  );
}

export function useDeleteOrder(): UseMutationResult<string, unknown, string> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<string, unknown, string>(
    async (id: string) => {
      await api.delete<void>(`/orders/${id}`);
      return id;
    },
    {
      async onSuccess(id: string) {
        queryClient.removeQueries(['orders', id], { exact: true });
        // TODO : Remove in list
        await queryClient.refetchQueries('orders');
      },
    },
  );
}
