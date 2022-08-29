import { useQuery, UseQueryResult } from 'react-query';
import { ListRequestParams, PaginatedList, RequestParams, useApi } from '../../api';
import Currency from './model';

export function useCurrency(id?: string, params?: RequestParams): UseQueryResult<Currency> {
  const api = useApi();
  return useQuery<Currency>(
    ['currencies', id],
    async () => {
      const { data } = await api.get<Currency>(`/currencies/${id}`, params);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export type CurrencyList = PaginatedList<'currencies', Currency>;

export type GetCurrenciesParams = ListRequestParams;

export function useCurrencies(
  params?: GetCurrenciesParams,
): UseQueryResult<CurrencyList> | undefined {
  const api = useApi();
  return useQuery<CurrencyList>(['currencies', params], async () => {
    const { data } = await api.get<CurrencyList>('/currencies', params);
    return data;
  });
}
