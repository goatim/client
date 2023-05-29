import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiContext, ApiError, ListRequestQuery, PaginatedList, useApi } from '../../api';
import { Order, OrderType } from './model';
import { useActiveWallet } from '../../market';

export async function getOrder(api: ApiContext, id: string): Promise<Order> {
  const { data } = await api.get<Order>(`/orders/${id}`);
  return data;
}

export function useOrder(
  id?: string,
  options?: Omit<UseQueryOptions<Order, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Order, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Order, ApiError | AxiosError>(['orders', id], () => getOrder(api, id as string), {
    ...options,
    enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
  });
}

export type OrderList = PaginatedList<'orders', Order>;

export interface GetOrdersQuery extends ListRequestQuery {
  wallet?: string;
}

export async function getOrders(api: ApiContext, query?: GetOrdersQuery): Promise<OrderList> {
  const { data } = await api.get<OrderList>('/orders', query);
  return data;
}

export function useOrders(
  query?: GetOrdersQuery,
  options?: Omit<UseQueryOptions<OrderList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<OrderList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<OrderList, ApiError | AxiosError>(
    ['orders', query],
    () => getOrders(api, query),
    options,
  );
}

export function useActiveWalletOrders(
  query?: Omit<GetOrdersQuery, 'wallet'>,
  options?: Omit<UseQueryOptions<OrderList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<OrderList> {
  const wallet = useActiveWallet();
  return useOrders(
    {
      ...query,
      wallet: wallet.data?.id || 'default',
    },
    options,
  );
}

export interface OrderBody {
  wallet?: string | null;
  asset?: string | null;
  type?: OrderType;
  price_limit?: number;
  nb_shares?: number;
  is_cancelled?: boolean;
}

export async function postOrder(api: ApiContext, body: OrderBody): Promise<Order> {
  const { data } = await api.post<Order, OrderBody>('/orders', body);
  return data;
}

export function usePostOrder(
  options?: Omit<UseMutationOptions<Order, ApiError | AxiosError, OrderBody>, 'mutationFn'>,
): UseMutationResult<Order, ApiError | AxiosError, OrderBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Order, ApiError | AxiosError, OrderBody>(
    (body: OrderBody) => postOrder(api, body),
    {
      onSuccess(order: Order) {
        queryClient.setQueryData(['orders', order.id], order);
      },
      ...options,
    },
  );
}

export async function putOrder(api: ApiContext, id: string, body: OrderBody): Promise<Order> {
  const { data } = await api.put<Order, OrderBody>(`/orders/${id}`, body);
  return data;
}

export type PutOrderVariables = OrderBody & { id: string };

export function usePutOrder(
  options?: Omit<UseMutationOptions<Order, ApiError | AxiosError, PutOrderVariables>, 'mutationFn'>,
): UseMutationResult<Order, ApiError | AxiosError, PutOrderVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Order, ApiError | AxiosError, PutOrderVariables>(
    ({ id, ...body }: PutOrderVariables) => putOrder(api, id, body),
    {
      onSuccess(order: Order) {
        queryClient.setQueryData(['orders', order.id], order);
      },
      ...options,
    },
  );
}

export async function deleteOrder(api: ApiContext, id: string): Promise<void> {
  await api.delete<void>(`/orders/${id}`);
}

export function useDeleteOrder(
  options?: Omit<UseMutationOptions<void, ApiError | AxiosError, string>, 'mutationFn'>,
): UseMutationResult<void, ApiError | AxiosError, string> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, ApiError | AxiosError, string>((id) => deleteOrder(api, id), {
    async onSuccess(res, id: string) {
      queryClient.removeQueries(['orders', id], { exact: true });
      // TODO : Remove in list
      await queryClient.refetchQueries(['orders']);
    },
    ...options,
  });
}
