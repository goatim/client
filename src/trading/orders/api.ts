import { PaginatedList, RequestBody, RequestParams, useApi } from '@cezembre/fronts';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import Order, { OrderType } from './model';
import { useCurrentWallet } from '../../market/wallets/api';

export function useOrder(id: string): UseQueryResult<Order> {
  const api = useApi();
  return useQuery<Order>(['orders', id], async () => {
    const { data } = await api.get<Order>(`/orders/${id}`);
    return data;
  });
}

export type OrderList = PaginatedList<'orders', Order>;

export interface UseOrdersParams extends RequestParams {
  wallet?: string;
  order?: string;
}

export function useOrders(params?: UseOrdersParams): UseQueryResult<OrderList> {
  const api = useApi();
  return useQuery<OrderList>(['orders', params], async () => {
    const { data } = await api.get<OrderList>('/orders', params);
    return data;
  });
}

export function useCurrentWalletOrders(
  params?: Omit<UseOrdersParams, 'wallet'>,
): UseQueryResult<OrderList> {
  const wallet = useCurrentWallet();
  return useOrders({
    ...params,
    wallet: wallet.data?.id || 'default',
  });
}

export interface OrderBody extends RequestBody {
  wallet?: string | null;
  asset?: string | null;
  type?: OrderType;
  price_limit?: number;
  quantity?: number;
  is_cancelled?: boolean;
}

export function useCreateOrder(): UseMutationResult<Order, unknown, OrderBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Order, unknown, OrderBody>(
    async (body: OrderBody) => {
      const { data } = await api.post<Order>('/orders', body);
      return data;
    },
    {
      onSuccess(order: Order) {
        queryClient.setQueryData(['orders', order.id], order);
      },
    },
  );
}

export type UpdateOrderVariables = OrderBody & { id: string };

export function useUpdateOrder(): UseMutationResult<Order, unknown, UpdateOrderVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Order, unknown, UpdateOrderVariables>(
    async ({ id, ...body }: UpdateOrderVariables) => {
      const { data } = await api.put<Order>(`/orders/${body}`, body);
      return data;
    },
    {
      onSuccess(order: Order) {
        queryClient.setQueryData(['orders', order.id], order);
      },
    },
  );
}

export function useDeleteOrder(id: string): UseMutationResult<void, unknown, void> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, unknown, void>(
    async () => {
      await api.delete<void>(`/orders/${id}`);
    },
    {
      onSuccess() {
        queryClient.removeQueries(['orders', id], { exact: true });
        // TODO : Remove in list
      },
    },
  );
}
