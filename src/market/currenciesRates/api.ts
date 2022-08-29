import { useQuery, UseQueryResult } from 'react-query';
import { ListRequestParams, PaginatedList, RequestParams, useApi } from '../../api';
import CurrenciesRate from './model';

export function useCurrenciesRate(
  id?: string,
  params?: RequestParams,
): UseQueryResult<CurrenciesRate> {
  const api = useApi();
  return useQuery<CurrenciesRate>(
    ['currencies_rates', id],
    async () => {
      const { data } = await api.get<CurrenciesRate>(`/currencies_rates/${id}`, params);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export type CurrenciesRateList = PaginatedList<'currencies_rates', CurrenciesRate>;

export type GetCurrenciesRatesParams = ListRequestParams;

export function useCurrenciesRates(
  params?: GetCurrenciesRatesParams,
): UseQueryResult<CurrenciesRateList> | undefined {
  const api = useApi();
  return useQuery<CurrenciesRateList>(['currencies_rates', params], async () => {
    const { data } = await api.get<CurrenciesRateList>('/currencies_rates', params);
    return data;
  });
}
