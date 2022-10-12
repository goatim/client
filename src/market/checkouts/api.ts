import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useApi, PaginatedList, RequestQuery } from '../../api';
import Checkout from './model';
import { useCurrentWallet } from '../wallets/api';
import { ItemType } from '../items/model';
import PaymentIntent from '../../payment/intents/model';
import { OrderList } from '../../trading/orders/api';

export interface CheckoutQuery extends RequestQuery {
  wallet?: string;
}

export function useCurrentCheckout(): UseQueryResult<Checkout> {
  const api = useApi();
  const queryClient = useQueryClient();
  const currentWallet = useCurrentWallet();
  return useQuery<Checkout>(
    ['checkouts', 'current'],
    async () => {
      const token = queryClient.getQueryData<Checkout>(['checkouts', 'current'])?.token;
      const { data } = await api.get<Checkout, CheckoutQuery>(`/checkouts/${token || 'current'}`, {
        wallet: currentWallet.data?.id,
      });
      return data;
    },
    {
      enabled: !!currentWallet.data?.id,
    },
  );
}

export type CheckoutList = PaginatedList<'checkouts', Checkout>;

export function useCheckouts(): UseQueryResult<CheckoutList> {
  const api = useApi();
  return useQuery<CheckoutList>('checkouts', async () => {
    const { data } = await api.get<CheckoutList>('/checkouts');
    return data;
  });
}

export interface CheckoutItemBody {
  type?: ItemType;
  order?: string;
  booster?: string;
  pack?: string;
}

export interface CheckoutBody {
  items?: CheckoutItemBody[] | string;
  wallet?: string;
  expiration?: string;
  payment_method?: string;
}

export function usePostCheckout(
  checkoutKey = 'current',
): UseMutationResult<Checkout, unknown, CheckoutBody> {
  const wallet = useCurrentWallet();
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Checkout, unknown, CheckoutBody>(
    async (body: CheckoutBody) => {
      if (body.items && Array.isArray(body.items)) {
        body.items = JSON.stringify(body.items);
      }

      if (wallet.data?.id) {
        body.wallet = wallet.data?.id;
      }
      const { data } = await api.post<Checkout, CheckoutBody>('/checkouts', body);
      return data;
    },
    {
      onSuccess(checkout: Checkout) {
        queryClient.setQueryData<Checkout>(['checkouts', checkoutKey], checkout);
      },
    },
  );
}

export function usePutCheckout(
  checkoutKey = 'current',
): UseMutationResult<Checkout, unknown, CheckoutBody> {
  const wallet = useCurrentWallet();
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Checkout, unknown, CheckoutBody>(
    async (body: CheckoutBody) => {
      if (body.items && Array.isArray(body.items)) {
        body.items = JSON.stringify(body.items);
      }
      const checkout = queryClient.getQueryData<Checkout>(['checkouts', checkoutKey]);
      const { data } = await api.put<Checkout, CheckoutBody, CheckoutQuery>(
        `/checkouts/${checkout?.token || 'current'}`,
        body,
        {
          wallet: wallet.data?.id,
        },
      );
      return data;
    },
    {
      onSuccess(checkout: Checkout) {
        queryClient.setQueryData<Checkout>(['checkouts', checkoutKey], checkout);
      },
    },
  );
}

export function useDeleteCheckout(checkoutKey = 'current'): UseMutationResult<void, unknown, void> {
  const wallet = useCurrentWallet();
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, unknown, void>(
    async () => {
      const checkout = queryClient.getQueryData<Checkout>(['checkouts', checkoutKey]);
      await api.delete<void, CheckoutQuery>(`/checkouts/${checkout?.token || 'current'}`, {
        wallet: wallet.data?.id,
      });
    },
    {
      onSuccess() {
        queryClient.removeQueries(['checkouts', checkoutKey], { exact: true });
      },
    },
  );
}

export function useAddCheckoutItem(
  checkoutKey = 'current',
): UseMutationResult<Checkout, unknown, CheckoutItemBody> {
  const wallet = useCurrentWallet();
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Checkout, unknown, CheckoutItemBody>(
    async (body: CheckoutItemBody) => {
      const checkout = queryClient.getQueryData<Checkout>(['checkouts', checkoutKey]);
      const { data } = await api.post<Checkout, CheckoutItemBody, CheckoutQuery>(
        `/checkouts/${checkout?.token || 'current'}/items`,
        body,
        {
          wallet: wallet.data?.id,
        },
      );
      return data;
    },
    {
      onSuccess(checkout: Checkout) {
        queryClient.setQueryData<Checkout>(['checkouts', checkoutKey], checkout);
      },
      onError() {
        // if (['invalid_checkout_token', 'not_found'].includes((error as ApiError).code || '')) {
        //   data = null;
        // }
      },
    },
  );
}

export type PutCheckoutItemVariables = CheckoutItemBody & { id: string };

export function usePutCheckoutItem(
  checkoutKey = 'current',
): UseMutationResult<Checkout, unknown, PutCheckoutItemVariables> {
  const wallet = useCurrentWallet();
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Checkout, unknown, PutCheckoutItemVariables>(
    async ({ id, ...body }: PutCheckoutItemVariables) => {
      const checkout = queryClient.getQueryData<Checkout>(['checkouts', checkoutKey]);
      const { data } = await api.put<Checkout, CheckoutItemBody, CheckoutQuery>(
        `/checkouts/${checkout?.token || 'current'}/items/${id}`,
        body,
        {
          wallet: wallet.data?.id,
        },
      );
      return data;
    },
    {
      onSuccess(checkout: Checkout) {
        queryClient.setQueryData<Checkout>(['checkouts', checkoutKey], checkout);
      },
      onError() {
        // if (['invalid_checkout_token', 'not_found'].includes((error as ApiError).code || '')) {
        //   data = null;
        // }
      },
    },
  );
}

export function useRemoveCheckoutItem(
  checkoutKey = 'current',
): UseMutationResult<Checkout, unknown, string> {
  const api = useApi();
  const queryClient = useQueryClient();
  const wallet = useCurrentWallet();
  return useMutation<Checkout, unknown, string>(
    async (id: string) => {
      const checkout = queryClient.getQueryData<Checkout>(['checkouts', checkoutKey]);
      const { data } = await api.delete<Checkout, CheckoutQuery>(
        `/checkouts/${checkout?.token || 'current'}/items/${id}`,
        {
          wallet: wallet.data?.id,
        },
      );
      return data;
    },
    {
      onSuccess(checkout: Checkout) {
        queryClient.setQueryData<Checkout>(['checkouts', checkoutKey], checkout);
      },
      onError() {
        // if (['invalid_checkout_token', 'not_found'].includes((error as ApiError).code || '')) {
        //   data = null;
        // }
      },
    },
  );
}

export interface ConfirmCheckoutBody {
  wallet?: string;
  billing?: string;
  payment_method?: string;
  card_number?: string;
  card_exp_month?: string;
  card_exp_year?: string;
  card_csc?: string;
  total_to_pay?: number;
  return_url?: string;
  save_payment_method?: string;
}

export interface CheckoutConfirmation {
  payment_intent?: PaymentIntent;
  orders?: OrderList;
}

export function useConfirmCheckout(
  checkoutKey = 'current',
): UseMutationResult<CheckoutConfirmation, unknown, ConfirmCheckoutBody> {
  const wallet = useCurrentWallet();
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<CheckoutConfirmation, unknown, ConfirmCheckoutBody>(
    async (body: ConfirmCheckoutBody) => {
      const checkout = queryClient.getQueryData<Checkout>(['checkouts', checkoutKey]);
      const { data } = await api.post<CheckoutConfirmation, ConfirmCheckoutBody, CheckoutQuery>(
        `/checkouts/${checkout?.token || 'current'}/confirm`,
        body,
        {
          wallet: wallet.data?.id,
        },
      );
      return data;
    },
    {
      onSuccess() {
        queryClient.removeQueries(['checkouts', checkoutKey], { exact: true });
      },
    },
  );
}
