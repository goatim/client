import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { PaginatedList, RequestBody, RequestParams, useApi } from '../../api';
import Tax from './model';

export function useTax(id?: string): UseQueryResult<Tax> {
  const api = useApi();
  return useQuery<Tax>(['taxes', id], async () => {
    const { data } = await api.get<Tax>(`/taxes/${id}`);
    return data;
  });
}

export type TaxList = PaginatedList<'taxes', Tax>;

export interface UseTaxesParams extends RequestParams {
  tags?: string;
  expand?: string;
}

export function useTaxes(params?: UseTaxesParams): UseQueryResult<TaxList> {
  const api = useApi();
  return useQuery<TaxList>(['taxes', params], async () => {
    const { data } = await api.get<TaxList>('/taxes', params);
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

export function useCreateTax(): UseMutationResult<Tax, unknown, TaxBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Tax, unknown, TaxBody>(
    async (body: TaxBody) => {
      const { data } = await api.post<Tax>('/taxes', body);
      return data;
    },
    {
      onSuccess(tax: Tax) {
        queryClient.setQueryData(['taxes', tax.id], tax);
      },
    },
  );
}

export type UpdateTaxVariables = TaxBody & { id: string };

export function useUpdateTax(): UseMutationResult<Tax, unknown, UpdateTaxVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Tax, unknown, UpdateTaxVariables>(
    async ({ id, ...body }: UpdateTaxVariables) => {
      const { data } = await api.put<Tax>(`/taxes/${body}`, body);
      return data;
    },
    {
      onSuccess(tax: Tax) {
        queryClient.setQueryData(['taxes', tax.id], tax);
      },
    },
  );
}
