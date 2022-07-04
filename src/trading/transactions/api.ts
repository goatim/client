import { useQuery, UseQueryResult } from 'react-query';
import { useApi, PaginatedList, RequestParams } from '../../api';
import Transaction from './model';

export function useTransaction(id?: string): UseQueryResult<Transaction> {
  const api = useApi();
  return useQuery<Transaction>(
    ['transactions', id],
    async () => {
      const { data } = await api.get<Transaction>(`/transactions/${id}`);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export type TransactionList = PaginatedList<'transactions', Transaction>;

export interface GetTransactionsParams extends RequestParams {
  order?: string;
}

export function useTransactions(params?: GetTransactionsParams): UseQueryResult<TransactionList> {
  const api = useApi();
  return useQuery<TransactionList>(['transactions', params], async () => {
    const { data } = await api.get<TransactionList>('/transactions', params);
    return data;
  });
}
