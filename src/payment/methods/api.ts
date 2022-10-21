import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useApi, PaginatedList } from '../../api';
import PaymentMethod from './model';

export type PaymentMethodList = PaginatedList<'payment_methods', PaymentMethod>;

export function usePaymentMethods(): UseQueryResult<PaymentMethodList> {
  const api = useApi();
  return useQuery<PaymentMethodList>('payment_methods', async () => {
    const { data } = await api.get<PaymentMethodList>('/payment_methods');
    return data;
  });
}

export interface CreditCardBody {
  payment_method?: string;
}

export function useAddCreditCard(): UseMutationResult<PaymentMethod, unknown, CreditCardBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PaymentMethod, unknown, CreditCardBody>(
    async (body: CreditCardBody) => {
      const { data } = await api.post<PaymentMethod, CreditCardBody>('/payment_methods', body);
      return data;
    },
    {
      onSuccess: (paymentMethod: PaymentMethod) => {
        queryClient.setQueryData<PaymentMethodList>(
          'payment_methods',
          (paymentMethodList: PaymentMethodList | undefined) => {
            return paymentMethodList
              ? {
                  ...paymentMethodList,
                  payment_methods: [...paymentMethodList.payment_methods, paymentMethod],
                  total: paymentMethodList.total + 1,
                }
              : { payment_methods: [paymentMethod], total: 1 };
          },
        );
      },
    },
  );
}
