import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import { useCallback } from 'react';
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
import { adaptEtherAmount, resolveGoatimCoinsAmount } from '../currencies';

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
  options?: Omit<UseQueryOptions<CurrenciesRate, ApiError | AxiosError>, 'queryKey' | 'queryKey'>,
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
  options?: Omit<
    UseQueryOptions<CurrenciesRateList, ApiError | AxiosError>,
    'queryFn' | 'queryKey'
  >,
): UseQueryResult<CurrenciesRateList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<CurrenciesRateList, ApiError | AxiosError>(
    ['currencies_rates', query],
    () => getCurrenciesRates(api, query),
    options,
  );
}

export function useGoatimCoinOverEtherConvertor(): (amount: number) => number | undefined {
  const goatimOverEther = useCurrenciesRate('GTC_ETH');
  return useCallback(
    (amount: number) => {
      if (goatimOverEther.data?.rate === undefined) {
        return undefined;
      }

      const resolvedGoatimCoins = resolveGoatimCoinsAmount(amount);

      return adaptEtherAmount(resolvedGoatimCoins * goatimOverEther.data.rate);
    },
    [goatimOverEther.data?.rate],
  );
}
