import { useQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';
import { UseQueryOptions } from 'react-query/types/react/types';
import { AxiosError } from 'axios';
import {
  ApiContext,
  ApiError,
  ListRequestQuery,
  PaginatedList,
  RequestQuery,
  useApi,
} from '../../api';
import { CurrenciesRate } from './model';
import { resolveFridayCoinsAmount } from '../currencies/fridayCoins';
import { adaptEtherAmount } from '../currencies/ether';

export type GetCurrenciesRateQuery = RequestQuery;

export async function getCurrenciesRate(
  api: ApiContext,
  id: string,
  query?: GetCurrenciesRateQuery,
): Promise<CurrenciesRate> {
  const { data } = await api.get<CurrenciesRate>(`/currencies_rates/${id}`, query);
  return data;
}

export function useCurrenciesRate(
  id?: string,
  query?: GetCurrenciesRateQuery,
  options?: Omit<UseQueryOptions<CurrenciesRate, ApiError | AxiosError>, 'queryFn' | 'queryFn'>,
): UseQueryResult<CurrenciesRate, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<CurrenciesRate, ApiError | AxiosError>(
    ['currencies_rates', id],
    () => getCurrenciesRate(api, id as string, query),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options?.enabled && !!id : !!id,
    },
  );
}

export type CurrenciesRateList = PaginatedList<'currencies_rates', CurrenciesRate>;

export type GetCurrenciesRatesQuery = ListRequestQuery;

export async function getCurrenciesRates(
  api: ApiContext,
  query?: GetCurrenciesRatesQuery,
): Promise<CurrenciesRateList> {
  const { data } = await api.get<CurrenciesRateList, GetCurrenciesRatesQuery>(
    '/currencies_rates',
    query,
  );
  return data;
}

export function useCurrenciesRates(
  query?: GetCurrenciesRatesQuery,
  options?: Omit<UseQueryOptions<CurrenciesRateList, ApiError | AxiosError>, 'queryFn' | 'queryFn'>,
): UseQueryResult<CurrenciesRateList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<CurrenciesRateList, ApiError | AxiosError>(
    ['currencies_rates', query],
    () => getCurrenciesRates(api, query),
    options,
  );
}

export function useFridayCoinOverEtherConvertor(): (amount: number) => number | undefined {
  const fridayOverEther = useCurrenciesRate('FDY_ETH');
  return useCallback(
    (amount: number) => {
      if (fridayOverEther.data?.rate === undefined) {
        return undefined;
      }

      const resolvedFridayCoins = resolveFridayCoinsAmount(amount);

      return adaptEtherAmount(resolvedFridayCoins * fridayOverEther.data.rate);
    },
    [fridayOverEther.data?.rate],
  );
}
