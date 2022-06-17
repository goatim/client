import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { useApi, RequestBody, PaginatedList } from '../../api';
import PaymentMethod from './model';

export type PaymentMethodList = PaginatedList<'payment_methods', PaymentMethod>;

export function usePaymentMethods(): UseQueryResult<PaymentMethodList> {
  const api = useApi();
  return useQuery<PaymentMethodList>('payment_methods', async () => {
    const { data } = await api.get<PaymentMethodList>('/payment_methods');
    return data;
  });
}

export interface CreditCardBody extends RequestBody {
  payment_method?: string;
}

export function useAddCreditCard(): UseMutationResult<PaymentMethod, unknown, CreditCardBody> {
  const api = useApi();
  return useMutation<PaymentMethod, unknown, CreditCardBody>(async (body: CreditCardBody) => {
    const { data } = await api.post<PaymentMethod, CreditCardBody>('/payment_methods', body);
    return data;
  });
}
