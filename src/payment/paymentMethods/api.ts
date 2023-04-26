import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiContext, ApiError, PaginatedList, RequestBody, useApi } from '../../api';
import { PaymentMethod } from './model';

export type PaymentMethodList = PaginatedList<'payment_methods', PaymentMethod>;

export async function getPaymentMethods(api: ApiContext): Promise<PaymentMethodList> {
  const { data } = await api.get<PaymentMethodList>('/payment_methods');
  return data;
}

export function usePaymentMethods(): UseQueryResult<PaymentMethodList> {
  const api = useApi();
  return useQuery<PaymentMethodList>(['payment_methods'], () => getPaymentMethods(api));
}

export interface CreditCardBody extends RequestBody {
  payment_method?: string;
}

export async function postCreditCard(
  api: ApiContext,
  body: CreditCardBody,
): Promise<PaymentMethod> {
  const { data } = await api.post<PaymentMethod, CreditCardBody>('/payment_methods', body);
  return data;
}

export function mergePaymentMethodInList(
  paymentMethod: PaymentMethod,
  paymentMethodList?: PaymentMethodList,
): PaymentMethodList {
  if (!paymentMethodList?.payment_methods.length) {
    return {
      ...paymentMethodList,
      total: paymentMethodList?.total || 1,
      payment_methods: [paymentMethod],
    };
  }

  const index = paymentMethodList.payment_methods.findIndex(({ id }) => id === paymentMethod.id);

  if (index === -1) {
    return {
      ...paymentMethodList,
      total: (paymentMethodList.total || 0) + 1,
      payment_methods: paymentMethodList.payment_methods
        ? [paymentMethod, ...paymentMethodList.payment_methods]
        : [paymentMethod],
    };
  }

  paymentMethodList.payment_methods[index] = paymentMethod;

  return paymentMethodList;
}

export function removePaymentMethodFromList(
  id: string,
  paymentMethodList?: PaymentMethodList,
): PaymentMethodList {
  if (!paymentMethodList?.payment_methods.length) {
    return {
      ...paymentMethodList,
      total: 0,
      payment_methods: [],
    };
  }

  const index = paymentMethodList.payment_methods.findIndex(
    (paymentMethod) => id === paymentMethod.id,
  );

  if (index === -1) {
    return paymentMethodList;
  }

  paymentMethodList.payment_methods.splice(index, 1);
  if (paymentMethodList.total) {
    paymentMethodList.total -= 1;
  }

  return paymentMethodList;
}

export function usePostCreditCard(): UseMutationResult<
  PaymentMethod,
  ApiError | AxiosError,
  CreditCardBody
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PaymentMethod, ApiError | AxiosError, CreditCardBody>(
    (body: CreditCardBody) => postCreditCard(api, body),
    {
      onSuccess: (paymentMethod: PaymentMethod) => {
        queryClient.setQueryData<PaymentMethodList>(
          ['payment_methods'],
          (paymentMethodList?: PaymentMethodList) =>
            mergePaymentMethodInList(paymentMethod, paymentMethodList),
        );
      },
    },
  );
}
