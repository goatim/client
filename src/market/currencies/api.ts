import { useQuery, UseQueryResult } from 'react-query';
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
import { Currency } from './model';

export type GetCurrencyQuery = RequestQuery;

export async function getCurrency(
  api: ApiContext,
  id: string,
  query?: GetCurrencyQuery,
): Promise<Currency> {
  const { data } = await api.get<Currency>(`/currencies/${id}`, query);
  return data;
}

export function useCurrency(
  id?: string,
  query?: RequestQuery,
  options?: Omit<UseQueryOptions<Currency, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<Currency, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Currency, ApiError | AxiosError>(
    ['currencies', id],
    () => getCurrency(api, id as string, query),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options?.enabled && !!id : !!id,
    },
  );
}

export type CurrencyList = PaginatedList<'currencies', Currency>;

export type GetCurrenciesQuery = ListRequestQuery;

export async function getCurrencies(
  api: ApiContext,
  query?: GetCurrenciesQuery,
): Promise<CurrencyList> {
  const { data } = await api.get<CurrencyList, GetCurrenciesQuery>('/currencies', query);
  return data;
}

export function useCurrencies(
  query?: GetCurrenciesQuery,
  options?: Omit<UseQueryOptions<CurrencyList, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<CurrencyList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<CurrencyList, ApiError | AxiosError>(
    ['currencies', query],
    () => getCurrencies(api, query),
    options,
  );
}
