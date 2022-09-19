import { useQuery, UseQueryResult } from 'react-query';
import { useApi, PaginatedList, RequestQuery } from '../../api';
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

export interface GetTransactionsQuery extends RequestQuery {
  order?: string;
}

export function useTransactions(query?: GetTransactionsQuery): UseQueryResult<TransactionList> {
  const api = useApi();
  return useQuery<TransactionList>(['transactions', query], async () => {
    const { data } = await api.get<TransactionList>('/transactions', query);
    return data;
  });
}
