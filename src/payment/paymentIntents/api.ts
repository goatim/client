import { useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { useEffect, useRef } from 'react';
import { UseQueryOptions } from 'react-query/types/react/types';
import { AxiosError } from 'axios';
import { Socket } from 'socket.io-client';
import { PaymentIntent } from './model';
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

export interface PaymentIntentList extends PaginatedList<'payment_intents', PaymentIntent> {
  total_unseen?: number;
  total_unread?: number;
}

export interface GetPaymentIntentsQuery extends ListRequestQuery {
  is_seen?: boolean;
  is_read?: boolean;
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
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = api.createSocket('/payment_intents', {
        query,
      });

      socket.current.on('connect_error', (error) => {
        console.error(error);
      });

      socket.current.on('created', async (paymentIntent: PaymentIntent) => {
        if (options?.onCreated) {
          options.onCreated(paymentIntent);
        }
        await queryClient.refetchQueries(['payment_intents', query]);
      });

      socket.current.on('updated', async (paymentIntent: PaymentIntent) => {
        if (options?.onUpdated) {
          options.onUpdated(paymentIntent);
        }
        await queryClient.refetchQueries(['payment_intents', query]);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.close();
        socket.current = null;
      }
    };
  }, [api, options, query, queryClient]);

  return useQuery<PaymentIntentList, ApiError | AxiosError>(
    ['payment_intents', query],
    () => getPaymentIntents(api, query),
    {
      staleTime: Infinity,
      ...options,
    },
  );
}
