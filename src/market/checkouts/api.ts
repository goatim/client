import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useCallback } from 'react';
import { UseQueryOptions } from 'react-query/types/react/types';
import { AxiosError } from 'axios';
import {
  ApiContext,
  ApiError,
  ListRequestQuery,
  PaginatedList,
  RequestBody,
  useApi,
} from '../../api';
import { Checkout } from './model';
import { useActiveWallet } from '../wallets';
import { ItemType } from '../items';
import { PaymentIntent } from '../../payment';
import { BoosterList, OrderList, PackList } from '../../trading';

export async function getCheckout(api: ApiContext, id: string): Promise<Checkout> {
  const { data } = await api.get<Checkout>(`/checkouts/${id}`);
  return data;
}

export function useCheckout(
  id?: string,
  options?: Omit<UseQueryOptions<Checkout, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Checkout, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Checkout, ApiError | AxiosError>(
    ['checkouts', id],
    () => getCheckout(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options?.enabled && !!id : !!id,
    },
  );
}

export interface GetCheckoutsQuery extends ListRequestQuery {
  wallet?: string;
}

export type CheckoutList = PaginatedList<'checkouts', Checkout>;

export function mergeCheckoutInList(checkout: Checkout, checkoutList?: CheckoutList): CheckoutList {
  if (!checkoutList?.checkouts.length) {
    return {
      ...checkoutList,
      total: checkoutList?.total || 1,
      checkouts: [checkout],
    };
  }

  const index = checkoutList.checkouts.findIndex(({ id }) => id === checkout.id);

  if (index === -1) {
    return {
      ...checkoutList,
      total: (checkoutList.total || 0) + 1,
      checkouts: checkoutList.checkouts ? [checkout, ...checkoutList.checkouts] : [checkout],
    };
  }

  checkoutList.checkouts[index] = checkout;

  return checkoutList;
}

export function removeCheckoutFromList(id: string, checkoutList?: CheckoutList): CheckoutList {
  if (!checkoutList?.checkouts.length) {
    return {
      ...checkoutList,
      total: 0,
      checkouts: [],
    };
  }

  const index = checkoutList.checkouts.findIndex((checkout) => id === checkout.id);

  if (index === -1) {
    return checkoutList;
  }

  checkoutList.checkouts.splice(index, 1);
  if (checkoutList.total) {
    checkoutList.total -= 1;
  }

  return checkoutList;
}

export async function getCheckouts(
  api: ApiContext,
  query?: GetCheckoutsQuery,
): Promise<CheckoutList> {
  const { data } = await api.get<CheckoutList>('/checkouts', query);
  return data;
}

export function useCheckouts(
  query?: GetCheckoutsQuery,
  options?: Omit<UseQueryOptions<CheckoutList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<CheckoutList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<CheckoutList, ApiError | AxiosError>(
    ['checkouts', query],
    () => getCheckouts(api, query),
    options,
  );
}

export function useActiveWalletCheckouts(
  options?: Omit<UseQueryOptions<CheckoutList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<CheckoutList, ApiError | AxiosError> {
  const wallet = useActiveWallet();
  return useCheckouts(
    { wallet: wallet.data?.id },
    {
      ...options,
      enabled:
        options?.enabled !== undefined ? options.enabled && !!wallet.data?.id : !!wallet.data?.id,
    },
  );
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

export async function postCheckout(api: ApiContext, body: CheckoutBody): Promise<Checkout> {
  if (body.items && Array.isArray(body.items)) {
    body.items = JSON.stringify(body.items);
  }

  const { data } = await api.post<Checkout, CheckoutBody>('/checkouts', body);

  return data;
}

export function usePostCheckout(
  options?: Omit<UseMutationOptions<Checkout, ApiError | AxiosError, CheckoutBody>, 'mutationFn'>,
): UseMutationResult<Checkout, ApiError | AxiosError, CheckoutBody> {
  const api = useApi();
  return useMutation<Checkout, ApiError | AxiosError, CheckoutBody>(
    (body: CheckoutBody) => postCheckout(api, body),
    options,
  );
}

export function usePostActiveWalletCheckout(
  options?: Omit<UseMutationOptions<Checkout, ApiError | AxiosError, CheckoutBody>, 'mutationFn'>,
): UseMutationResult<Checkout, ApiError | AxiosError, CheckoutBody> {
  const api = useApi();
  const wallet = useActiveWallet();
  const queryClient = useQueryClient();

  return useMutation<Checkout, ApiError | AxiosError, CheckoutBody>(
    (body: CheckoutBody) => postCheckout(api, { ...body, wallet: wallet.data?.id }),
    {
      onSuccess(checkout: Checkout) {
        queryClient.setQueryData<CheckoutList>(
          ['checkouts', { wallet: wallet.data?.id }],
          (checkoutList) => mergeCheckoutInList(checkout, checkoutList),
        );
      },
      ...options,
    },
  );
}

export async function putCheckout(
  api: ApiContext,
  id: string,
  body: CheckoutBody,
): Promise<Checkout> {
  if (body.items && Array.isArray(body.items)) {
    body.items = JSON.stringify(body.items);
  }

  const { data } = await api.put<Checkout, CheckoutBody, GetCheckoutsQuery>(
    `/checkouts/${id}`,
    body,
  );

  return data;
}

export type UsePutCheckoutVariables = CheckoutBody & { id: string };

export function usePutCheckout(
  options?: Omit<UseMutationOptions<Checkout, ApiError | AxiosError, CheckoutBody>, 'mutationFn'>,
): UseMutationResult<Checkout, ApiError | AxiosError, UsePutCheckoutVariables> {
  const api = useApi();
  return useMutation<Checkout, ApiError | AxiosError, UsePutCheckoutVariables>(
    ({ id, ...body }: UsePutCheckoutVariables) => putCheckout(api, id, body),
    options,
  );
}

export function usePutActiveWalletCheckout(
  options?: Omit<
    UseMutationOptions<Checkout, ApiError | AxiosError, UsePutCheckoutVariables>,
    'mutationFn'
  >,
): UseMutationResult<Checkout, ApiError | AxiosError, UsePutCheckoutVariables> {
  const api = useApi();
  const wallet = useActiveWallet();
  const queryClient = useQueryClient();

  return useMutation<Checkout, ApiError | AxiosError, UsePutCheckoutVariables>(
    ({ id, ...body }: UsePutCheckoutVariables) =>
      putCheckout(api, id, { ...body, wallet: wallet.data?.id }),
    {
      onSuccess(checkout: Checkout) {
        queryClient.setQueryData<CheckoutList>(
          ['checkouts', { wallet: wallet.data?.id }],
          (checkoutList) => mergeCheckoutInList(checkout, checkoutList),
        );
      },
      ...options,
    },
  );
}

export async function deleteCheckout(api: ApiContext, id: string): Promise<void> {
  await api.delete<void>(`/checkouts/${id}`);
}

export function useDeleteCheckout(
  options?: Omit<UseMutationOptions<void, ApiError | AxiosError, string>, 'mutationFn'>,
): UseMutationResult<void, ApiError | AxiosError, string> {
  const api = useApi();
  return useMutation<void, ApiError | AxiosError, string>(
    (id: string) => deleteCheckout(api, id),
    options,
  );
}

export function useDeleteActiveWalletCheckout(
  id: string,
  options?: Omit<UseMutationOptions<void, ApiError | AxiosError>, 'mutationFn'>,
): UseMutationResult<void, ApiError | AxiosError, void> {
  const api = useApi();
  const wallet = useActiveWallet();
  const queryClient = useQueryClient();
  return useMutation<void, ApiError | AxiosError, void>(() => deleteCheckout(api, id), {
    onSuccess() {
      queryClient.setQueryData(
        ['checkouts', { wallet: wallet.data?.id }],
        (checkoutList?: CheckoutList) => removeCheckoutFromList(id, checkoutList),
      );
    },
    ...options,
  });
}

export async function postCheckoutItem(
  api: ApiContext,
  id: string,
  body: CheckoutItemBody,
): Promise<Checkout> {
  const { data } = await api.post<Checkout, CheckoutItemBody>(`/checkouts/${id}/items`, body);
  return data;
}

export type UsePostCheckoutVariables = CheckoutItemBody & { checkoutId: string };

export function usePostCheckoutItem(
  options?: Omit<
    UseMutationOptions<Checkout, ApiError | AxiosError, UsePostCheckoutVariables>,
    'mutationFn'
  >,
): UseMutationResult<Checkout, ApiError | AxiosError, UsePostCheckoutVariables> {
  const api = useApi();
  return useMutation<Checkout, ApiError | AxiosError, UsePostCheckoutVariables>(
    ({ checkoutId, ...body }: UsePostCheckoutVariables) => postCheckoutItem(api, checkoutId, body),
    options,
  );
}

export function usePostActiveWalletCheckoutItem(
  options?: Omit<
    UseMutationOptions<Checkout, ApiError | AxiosError, UsePostCheckoutVariables>,
    'mutationFn'
  >,
): UseMutationResult<Checkout, ApiError | AxiosError, UsePostCheckoutVariables> {
  const api = useApi();
  const wallet = useActiveWallet();
  const queryClient = useQueryClient();
  return useMutation<Checkout, ApiError | AxiosError, UsePostCheckoutVariables>(
    ({ checkoutId, ...body }: UsePostCheckoutVariables) => postCheckoutItem(api, checkoutId, body),
    {
      onSuccess(checkout: Checkout) {
        queryClient.setQueryData<CheckoutList>(
          ['checkouts', { wallet: wallet.data?.id }],
          (checkoutList) => mergeCheckoutInList(checkout, checkoutList),
        );
      },
      ...options,
    },
  );
}

export async function putCheckoutItem(
  api: ApiContext,
  checkoutId: string,
  itemId: string,
  body: CheckoutItemBody,
): Promise<Checkout> {
  const { data } = await api.put<Checkout, CheckoutItemBody>(
    `/checkouts/${checkoutId}/items/${itemId}`,
    body,
  );
  return data;
}

export type PutCheckoutItemVariables = CheckoutItemBody & { checkoutId: string; itemId: string };

export function usePutCheckoutItem(
  options?: Omit<
    UseMutationOptions<Checkout, ApiError | AxiosError, PutCheckoutItemVariables>,
    'mutationFn'
  >,
): UseMutationResult<Checkout, ApiError | AxiosError, PutCheckoutItemVariables> {
  const api = useApi();
  return useMutation<Checkout, ApiError | AxiosError, PutCheckoutItemVariables>(
    ({ checkoutId, itemId, ...body }: PutCheckoutItemVariables) =>
      putCheckoutItem(api, checkoutId, itemId, body),
    options,
  );
}

export function usePutActiveWalletCheckoutItem(
  options?: Omit<
    UseMutationOptions<Checkout, ApiError | AxiosError, PutCheckoutItemVariables>,
    'mutationFn'
  >,
): UseMutationResult<Checkout, ApiError | AxiosError, PutCheckoutItemVariables> {
  const api = useApi();
  const wallet = useActiveWallet();
  const queryClient = useQueryClient();

  return useMutation<Checkout, ApiError | AxiosError, PutCheckoutItemVariables>(
    ({ checkoutId, itemId, ...body }: PutCheckoutItemVariables) =>
      putCheckoutItem(api, checkoutId, itemId, body),
    {
      onSuccess(checkout: Checkout) {
        queryClient.setQueryData<CheckoutList>(
          ['checkouts', { wallet: wallet.data?.id }],
          (checkoutList) => mergeCheckoutInList(checkout, checkoutList),
        );
      },
      ...options,
    },
  );
}

export async function removeCheckoutItem(
  api: ApiContext,
  checkoutId: string,
  itemId: string,
): Promise<Checkout> {
  const { data } = await api.delete<Checkout>(`/checkouts/${checkoutId}/items/${itemId}`);
  return data;
}

export type UseRemoveCheckoutItemVariables = { checkoutId: string; itemId: string };

export function useRemoveCheckoutItem(
  options?: Omit<
    UseMutationOptions<Checkout, ApiError | AxiosError, UseRemoveCheckoutItemVariables>,
    'mutationFn'
  >,
): UseMutationResult<Checkout, ApiError | AxiosError, UseRemoveCheckoutItemVariables> {
  const api = useApi();
  return useMutation<Checkout, ApiError | AxiosError, UseRemoveCheckoutItemVariables>(
    ({ checkoutId, itemId }: UseRemoveCheckoutItemVariables) =>
      removeCheckoutItem(api, checkoutId, itemId),
    options,
  );
}

export function useRemoveActiveWalletCheckoutItem(
  options?: Omit<
    UseMutationOptions<Checkout, ApiError | AxiosError, UseRemoveCheckoutItemVariables>,
    'mutationFn'
  >,
): UseMutationResult<Checkout, ApiError | AxiosError, UseRemoveCheckoutItemVariables> {
  const api = useApi();
  const wallet = useActiveWallet();
  const queryClient = useQueryClient();

  return useMutation<Checkout, ApiError | AxiosError, UseRemoveCheckoutItemVariables>(
    ({ checkoutId, itemId }: UseRemoveCheckoutItemVariables) =>
      removeCheckoutItem(api, checkoutId, itemId),
    {
      onSuccess(checkout: Checkout) {
        queryClient.setQueryData<CheckoutList>(
          ['checkouts', { wallet: wallet.data?.id }],
          (checkoutList) => mergeCheckoutInList(checkout, checkoutList),
        );
      },
      ...options,
    },
  );
}

export interface ConfirmCheckoutBody extends RequestBody {
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

export interface CheckoutConfirmation {
  payment_intent?: PaymentIntent;
  orders?: OrderList;
  packs?: PackList;
  boosters?: BoosterList;
}

export async function confirmCheckout(
  api: ApiContext,
  id: string,
  body: ConfirmCheckoutBody,
): Promise<CheckoutConfirmation> {
  const { data } = await api.post<CheckoutConfirmation, ConfirmCheckoutBody>(
    `/checkouts/${id}/confirm`,
    body,
  );
  return data;
}

export type UseConfirmCheckoutVariables = ConfirmCheckoutBody & { id: string };

export function useConfirmCheckout(
  options?: Omit<
    UseMutationOptions<CheckoutConfirmation, ApiError | AxiosError, UseConfirmCheckoutVariables>,
    'mutationFn'
  >,
): UseMutationResult<CheckoutConfirmation, ApiError | AxiosError, UseConfirmCheckoutVariables> {
  const api = useApi();
  return useMutation<CheckoutConfirmation, ApiError | AxiosError, UseConfirmCheckoutVariables>(
    ({ id, ...body }: UseConfirmCheckoutVariables) => confirmCheckout(api, id, body),
    options,
  );
}

export function useClearActiveWalletCheckouts(): () => void {
  const wallet = useActiveWallet();
  const queryClient = useQueryClient();
  return useCallback(() => {
    queryClient.removeQueries(['checkouts', { wallet: wallet.data?.id }]);
  }, [queryClient, wallet.data?.id]);
}
