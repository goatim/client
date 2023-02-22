import { useQuery, UseQueryResult } from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { AxiosError } from 'axios';
import { ApiContext, ApiError, ListRequestQuery, PaginatedList, useApi } from '../../api';
import { Transaction } from './model';

export async function getTransaction(api: ApiContext, id: string): Promise<Transaction> {
  const { data } = await api.get<Transaction>(`/transactions/${id}`);
  return data;
}

export function useTransaction(
  id?: string,
  options?: Omit<UseQueryOptions<Transaction, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Transaction, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Transaction, ApiError | AxiosError>(
    ['transactions', id],
    () => getTransaction(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type TransactionList = PaginatedList<'transactions', Transaction>;

export interface GetTransactionsQuery extends ListRequestQuery {
  order?: string;
}

export async function getTransactions(
  api: ApiContext,
  query?: GetTransactionsQuery,
): Promise<TransactionList> {
  const { data } = await api.get<TransactionList>('/transactions', query);
  return data;
}

export function useTransactions(
  query?: GetTransactionsQuery,
  options?: Omit<UseQueryOptions<TransactionList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<TransactionList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<TransactionList, ApiError | AxiosError>(
    ['transactions', query],
    () => getTransactions(api, query),
    options,
  );
}
