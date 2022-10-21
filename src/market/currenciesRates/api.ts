import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { ListRequestQuery, PaginatedList, RequestQuery, useApi } from '../../api';
import CurrenciesRate from './model';
import { resolveFridayCoins } from '../currencies/fridayCoins';

export function useCurrenciesRate(
  id?: string,
  query?: RequestQuery,
): UseQueryResult<CurrenciesRate> {
  const api = useApi();
  return useQuery<CurrenciesRate>(
    ['currencies_rates', id],
    async () => {
      const { data } = await api.get<CurrenciesRate>(`/currencies_rates/${id}`, query);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export type CurrenciesRateList = PaginatedList<'currencies_rates', CurrenciesRate>;

export type GetCurrenciesRatesQuery = ListRequestQuery;

export function useCurrenciesRates(
  query?: GetCurrenciesRatesQuery,
): UseQueryResult<CurrenciesRateList> | undefined {
  const api = useApi();
  return useQuery<CurrenciesRateList>(['currencies_rates', query], async () => {
    const { data } = await api.get<CurrenciesRateList, GetCurrenciesRatesQuery>(
      '/currencies_rates',
      query,
    );
    return data;
  });
}

export function useFridayCoinOverEtherConvertor(): (amount: number) => number | undefined {
  const fridayOverEther = useCurrenciesRate('FDY_ETH');
  return useCallback(
    (amount: number) => {
      const resolvedFridayCoins = resolveFridayCoins(amount);

      if (fridayOverEther.data?.rate === undefined) {
        return undefined;
      }
      return resolvedFridayCoins * fridayOverEther.data.rate;
    },
    [fridayOverEther.data?.rate],
  );
}
