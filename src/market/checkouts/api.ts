import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useCallback } from 'react';
import { useApi, PaginatedList, RequestQuery, RequestBody } from '../../api';
import Checkout from './model';
import { useCurrentWallet } from '../wallets/api';
import { ItemType } from '../items/model';
import PaymentIntent from '../../payment/intents/model';
import { OrderList } from '../../trading/orders/api';
import { PackList } from '../../trading/packs/api';
import { BoosterList } from '../../trading/boosters/api';

export interface CheckoutQuery extends RequestQuery {
  wallet?: string;
}

export function useCheckout(id: string, query?: CheckoutQuery): UseQueryResult<Checkout> {
  const api = useApi();
  return useQuery<Checkout>(
    ['checkouts', id, query],
    async () => {
      const { data } = await api.get<Checkout, CheckoutQuery>(`/checkouts/${id}`, query);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export function useCurrentCheckout(): UseQueryResult<Checkout> {
  const currentWallet = useCurrentWallet();
  return useCheckout('current', { wallet: currentWallet.data?.id });
}

export type CheckoutList = PaginatedList<'checkouts', Checkout>;

export function useCheckouts(query?: CheckoutQuery): UseQueryResult<CheckoutList> {
  const api = useApi();
  return useQuery<CheckoutList>(['checkouts', query], async () => {
    const { data } = await api.get<CheckoutList, CheckoutQuery>('/checkouts', query);
    return data;
  });
}

export interface CheckoutItemBody extends RequestBody {
  type?: ItemType;
  order?: string;
  booster?: string;
  pack?: string;
}

export interface CheckoutBody extends RequestBody {
  items?: CheckoutItemBody[] | string;
  wallet?: string;
  expiration?: string;
  payment_method?: string;
}

export function usePostCheckout(
  query?: CheckoutQuery,
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
        queryClient.setQueryData<CheckoutList>(['checkouts', query], (old) => ({
          ...old,
          checkouts: [checkout],
          total: 1,
        }));
      },
    },
  );
}

export function usePutCheckout(
  id = 'current',
  query?: CheckoutQuery,
): UseMutationResult<Checkout, unknown, CheckoutBody> {
  const wallet = useCurrentWallet();
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Checkout, unknown, CheckoutBody>(
    async (body: CheckoutBody) => {
      if (body.items && Array.isArray(body.items)) {
        body.items = JSON.stringify(body.items);
      }
      const { data } = await api.put<Checkout, CheckoutBody, CheckoutQuery>(
        `/checkouts/${id}`,
        body,
        {
          wallet: wallet.data?.id,
        },
      );
      return data;
    },
    {
      onSuccess(checkout: Checkout) {
        queryClient.setQueryData<CheckoutList>(['checkouts', query], (old) => ({
          ...old,
          checkouts: [checkout],
          total: 1,
        }));
      },
    },
  );
}

export function useDeleteCheckout(
  id = 'current',
  query?: CheckoutQuery,
): UseMutationResult<void, unknown, void> {
  const wallet = useCurrentWallet();
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, unknown, void>(
    async () => {
      await api.delete<void, CheckoutQuery>(`/checkouts/${id}`, {
        wallet: wallet.data?.id,
      });
    },
    {
      onSuccess() {
        queryClient.removeQueries(['checkouts', query], { exact: true });
      },
    },
  );
}

export function useAddCheckoutItem(
  id = 'current',
  query?: CheckoutQuery,
): UseMutationResult<Checkout, unknown, CheckoutItemBody> {
  const wallet = useCurrentWallet();
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Checkout, unknown, CheckoutItemBody>(
    async (body: CheckoutItemBody) => {
      const { data } = await api.post<Checkout, CheckoutItemBody, CheckoutQuery>(
        `/checkouts/${id}/items`,
        body,
        {
          wallet: wallet.data?.id,
        },
      );
      return data;
    },
    {
      onSuccess(checkout: Checkout) {
        queryClient.setQueryData<CheckoutList>(['checkouts', query], (old) => ({
          ...old,
          checkouts: [checkout],
          total: 1,
        }));
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
  id = 'current',
  query?: CheckoutQuery,
): UseMutationResult<Checkout, unknown, PutCheckoutItemVariables> {
  const wallet = useCurrentWallet();
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Checkout, unknown, PutCheckoutItemVariables>(
    async ({ id: itemId, ...body }: PutCheckoutItemVariables) => {
      const { data } = await api.put<Checkout, CheckoutItemBody, CheckoutQuery>(
        `/checkouts/${id}/items/${itemId}`,
        body,
        {
          wallet: wallet.data?.id,
        },
      );
      return data;
    },
    {
      onSuccess(checkout: Checkout) {
        queryClient.setQueryData<CheckoutList>(['checkouts', query], (old) => ({
          ...old,
          checkouts: [checkout],
          total: 1,
        }));
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
  id = 'current',
  query?: CheckoutQuery,
): UseMutationResult<Checkout, unknown, string> {
  const api = useApi();
  const queryClient = useQueryClient();
  const wallet = useCurrentWallet();
  return useMutation<Checkout, unknown, string>(
    async (itemId: string) => {
      const { data } = await api.delete<Checkout, CheckoutQuery>(
        `/checkouts/${id}/items/${itemId}`,
        {
          wallet: wallet.data?.id,
        },
      );
      return data;
    },
    {
      onSuccess(checkout: Checkout) {
        queryClient.setQueryData<CheckoutList>(['checkouts', query], (old) => ({
          ...old,
          checkouts: [checkout],
          total: 1,
        }));
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
  save_payment_method?: boolean;
}

export interface CheckoutConfirmation extends RequestBody {
  payment_intent?: PaymentIntent;
  orders?: OrderList;
  packs?: PackList;
  boosters?: BoosterList;
}

export function useConfirmCheckout(
  id = 'current',
): UseMutationResult<CheckoutConfirmation, unknown, ConfirmCheckoutBody> {
  const wallet = useCurrentWallet();
  const api = useApi();
  return useMutation<CheckoutConfirmation, unknown, ConfirmCheckoutBody>(
    async (body: ConfirmCheckoutBody) => {
      const { data } = await api.post<CheckoutConfirmation, ConfirmCheckoutBody, CheckoutQuery>(
        `/checkouts/${id}/confirm`,
        body,
        {
          wallet: wallet.data?.id,
        },
      );
      return data;
    },
  );
}

export function useClearCheckouts(query?: CheckoutQuery): () => void {
  const queryClient = useQueryClient();
  return useCallback(() => {
    queryClient.removeQueries(['checkouts', query], { exact: true });
  }, [query, queryClient]);
}
