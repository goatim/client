import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { PaginatedList, RequestBody, RequestQuery, useApi } from '../../api';
import Tax from './model';

export function useTax(id?: string): UseQueryResult<Tax> {
  const api = useApi();
  return useQuery<Tax>(['taxes', id], async () => {
    const { data } = await api.get<Tax>(`/taxes/${id}`);
    return data;
  });
}

export type TaxList = PaginatedList<'taxes', Tax>;

export interface GetTaxesQuery extends RequestQuery {
  tags?: string;
}

export function useTaxes(query?: GetTaxesQuery): UseQueryResult<TaxList> {
  const api = useApi();
  return useQuery<TaxList>(['taxes', query], async () => {
    const { data } = await api.get<TaxList, GetTaxesQuery>('/taxes', query);
    return data;
  });
}

export function useVats(): UseQueryResult<TaxList> {
  return useTaxes({ tags: 'vat' });
}

export interface TaxBody extends RequestBody {
  tags?: string | null;
  name?: string | null;
  amount?: number;
  currency?: string | null;
  percentage?: number;
}

export function usePostTax(): UseMutationResult<Tax, unknown, TaxBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Tax, unknown, TaxBody>(
    async (body: TaxBody) => {
      const { data } = await api.post<Tax, TaxBody>('/taxes', body);
      return data;
    },
    {
      onSuccess(tax: Tax) {
        queryClient.setQueryData(['taxes', tax.id], tax);
      },
    },
  );
}

export type PutTaxVariables = TaxBody & { id: string };

export function usePutTax(): UseMutationResult<Tax, unknown, PutTaxVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Tax, unknown, PutTaxVariables>(
    async ({ id, ...body }: PutTaxVariables) => {
      const { data } = await api.put<Tax, TaxBody>(`/taxes/${id}`, body);
      return data;
    },
    {
      onSuccess(tax: Tax) {
        queryClient.setQueryData(['taxes', tax.id], tax);
      },
    },
  );
}
