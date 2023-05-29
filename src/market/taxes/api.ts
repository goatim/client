import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiContext, ApiError, PaginatedList, RequestQuery, useApi } from '../../api';
import { Tax } from './model';

export async function getTax(api: ApiContext, id: string): Promise<Tax> {
  const { data } = await api.get<Tax>(`/taxes/${id}`);
  return data;
}

export function useTax(
  id?: string,
  options?: Omit<UseQueryOptions<Tax, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Tax, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Tax, ApiError | AxiosError>(['taxes', id], () => getTax(api, id as string), {
    ...options,
    enabled: options?.enabled !== undefined ? options?.enabled && !!id : !!id,
  });
}

export type TaxList = PaginatedList<'taxes', Tax>;

export interface GetTaxesQuery extends RequestQuery {
  tags?: string;
}

export async function getTaxes(api: ApiContext, query?: GetTaxesQuery): Promise<TaxList> {
  const { data } = await api.get<TaxList, GetTaxesQuery>('/taxes', query);
  return data;
}

export function useTaxes(
  query?: GetTaxesQuery,
  options?: Omit<UseQueryOptions<TaxList, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<TaxList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<TaxList, ApiError | AxiosError>(
    ['taxes', query],
    () => getTaxes(api, query),
    options,
  );
}

export function useVats(
  options?: Omit<UseQueryOptions<TaxList, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<TaxList> {
  return useTaxes({ tags: 'vat' }, options);
}

export interface TaxBody {
  tags?: string | null;
  name?: string | null;
  amount?: number;
  currency?: string | null;
  percentage?: number;
}

export async function postTax(api: ApiContext, body: TaxBody): Promise<Tax> {
  const { data } = await api.post<Tax, TaxBody>('/taxes', body);
  return data;
}

export function usePostTax(
  options?: Omit<UseMutationOptions<Tax, ApiError | AxiosError, TaxBody>, 'mutationFn'>,
): UseMutationResult<Tax, ApiError | AxiosError, TaxBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Tax, ApiError | AxiosError, TaxBody>((body: TaxBody) => postTax(api, body), {
    onSuccess(tax: Tax) {
      queryClient.setQueryData(['taxes', tax.id], tax);
    },
    ...options,
  });
}

export async function putTax(api: ApiContext, id: string, body: TaxBody): Promise<Tax> {
  const { data } = await api.put<Tax, TaxBody>(`/taxes/${id}`, body);
  return data;
}

export type PutTaxVariables = TaxBody & { id: string };

export function usePutTax(
  options?: Omit<UseMutationOptions<Tax, ApiError | AxiosError, TaxBody>, 'mutationFn'>,
): UseMutationResult<Tax, ApiError | AxiosError, PutTaxVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Tax, ApiError | AxiosError, PutTaxVariables>(
    ({ id, ...body }: PutTaxVariables) => putTax(api, id, body),
    {
      onSuccess(tax: Tax) {
        queryClient.setQueryData(['taxes', tax.id], tax);
      },
      ...options,
    },
  );
}
