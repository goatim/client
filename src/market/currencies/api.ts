import { useQuery, UseQueryResult } from 'react-query';
import { ListRequestQuery, PaginatedList, RequestQuery, useApi } from '../../api';
import Currency from './model';

export function useCurrency(id?: string, query?: RequestQuery): UseQueryResult<Currency> {
  const api = useApi();
  return useQuery<Currency>(
    ['players', id],
    async () => {
      const { data } = await api.get<Currency>(`/currencies/${id}`, query);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export type CurrencyList = PaginatedList<'players', Currency>;

export type GetCurrenciesQuery = ListRequestQuery;

export function useCurrencies(
  query?: GetCurrenciesQuery,
): UseQueryResult<CurrencyList> | undefined {
  const api = useApi();
  return useQuery<CurrencyList>(['players', query], async () => {
    const { data } = await api.get<CurrencyList, GetCurrenciesQuery>('/currencies', query);
    return data;
  });
}
