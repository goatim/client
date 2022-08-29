import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { ListRequestParams, PaginatedList, RequestParams, useApi } from '../../api';
import CurrenciesRate from './model';
import { adaptFridayCoins, resolveFridayCoins } from '../currencies/fridayCoins';

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

export function useFridayCoinOverEtherConvertor(): (amount?: number) => number | undefined {
  const fridayOverEther = useCurrenciesRate('FDY_ETH');
  return useCallback(
    (amount?: number) => {
      const resolvedFridayCoins = resolveFridayCoins(amount);

      if (resolvedFridayCoins === undefined) {
        return undefined;
      }

      if (fridayOverEther.data?.rate !== undefined) {
        return resolvedFridayCoins * fridayOverEther.data.rate;
      }
      return undefined;
    },
    [fridayOverEther.data?.rate],
  );
}
