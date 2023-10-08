import { useQuery, useQueryClient, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { PaymentIntent, PaymentIntentStatus } from './model';
import {
  ApiContext,
  ApiError,
  ListRequestQuery,
  PaginatedList,
  RequestQuery,
  useApi,
} from '../../api';

export type GetPaymentIntentQuery = RequestQuery;

export async function getPaymentIntent(
  api: ApiContext,
  id: string,
  query?: GetPaymentIntentQuery,
): Promise<PaymentIntent> {
  const { data } = await api.get<PaymentIntent, RequestQuery>(`/payment_intents/${id}`, query);
  return data;
}

export function usePaymentIntent(
  id?: string,
  query?: GetPaymentIntentQuery,
  options?: Omit<UseQueryOptions<PaymentIntent, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<PaymentIntent, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<PaymentIntent, ApiError | AxiosError>(
    ['payment_intents', id],
    () => getPaymentIntent(api, id as string, query),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options?.enabled && !!id : !!id,
    },
  );
}

export type PaymentIntentList = PaginatedList<'payment_intents', PaymentIntent>;

export interface GetPaymentIntentsQuery extends ListRequestQuery {
  wallet?: string;
  status?: PaymentIntentStatus | PaymentIntentStatus[];
}

export async function getPaymentIntents(
  api: ApiContext,
  query?: GetPaymentIntentsQuery,
): Promise<PaymentIntentList> {
  const { data } = await api.get<PaymentIntentList>('/payment_intents', query);
  return data;
}

export interface UsePaymentIntentsOptions
  extends Omit<UseQueryOptions<PaymentIntentList, ApiError | AxiosError>, 'queryFn' | 'queryKey'> {
  onCreated?: (paymentIntent: PaymentIntent) => unknown;
  onUpdated?: (paymentIntent: PaymentIntent) => unknown;
}

export function usePaymentIntents(
  query?: GetPaymentIntentsQuery,
  options?: UsePaymentIntentsOptions,
): UseQueryResult<PaymentIntentList, ApiError | AxiosError> {
  const api = useApi();
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   const socket = api.openSocket('/payment-intents', ['payment-intents', query], {
  //     query,
  //   });

  //   socket.on('connect_error', (error) => {
  //     console.error(error);
  //   });

  //   socket.on('created', async (paymentIntent: PaymentIntent) => {
  //     if (options?.onCreated) {
  //       options.onCreated(paymentIntent);
  //     }
  //     await queryClient.refetchQueries(['payment_intents', query]);
  //   });

  //   socket.on('updated', async (paymentIntent: PaymentIntent) => {
  //     if (options?.onUpdated) {
  //       options.onUpdated(paymentIntent);
  //     }
  //     await queryClient.refetchQueries(['payment_intents', query]);
  //   });

  //   return () => {
  //     socket.off('connect_error');
  //     socket.off('created');
  //     socket.off('updated');
  //   };
  // }, [api, options, query, queryClient]);

  return useQuery<PaymentIntentList, ApiError | AxiosError>(
    ['payment_intents', query],
    () => getPaymentIntents(api, query),
    {
      staleTime: Infinity,
      ...options,
    },
  );
}
