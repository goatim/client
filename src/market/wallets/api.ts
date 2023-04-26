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
import { Wallet } from './model';
import {
  ApiContext,
  ApiError,
  ListRequestQuery,
  PaginatedList,
  RequestBody,
  RequestQuery,
  useApi,
} from '../../api';
import { useGoatimClient } from '../../client';
import { useActiveSession, useDoesActiveSessionUserHasVerifiedEmail } from '../../auth';

export interface GetWalletQuery extends RequestQuery {
  ranking?: string;
}

export async function getWallet(
  api: ApiContext,
  id: string,
  query?: GetWalletQuery,
): Promise<Wallet> {
  const { data } = await api.get<Wallet, RequestQuery>(`/wallets/${id}`, query);
  return data;
}

export function useWallet(
  id?: string,
  query?: GetWalletQuery,
  options?: Omit<UseQueryOptions<Wallet, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Wallet, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Wallet, ApiError | AxiosError>(
    ['wallets', id, query],
    () => getWallet(api, id as string, query),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options?.enabled && !!id : !!id,
    },
  );
}

export function useActiveWallet(
  query?: GetWalletQuery,
  options?: Omit<UseQueryOptions<Wallet, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Wallet> {
  const { wallet } = useGoatimClient();
  const userHasVerifiedEmail = useDoesActiveSessionUserHasVerifiedEmail();
  return useWallet(wallet, query, {
    ...options,
    enabled:
      options?.enabled !== undefined
        ? options.enabled && userHasVerifiedEmail
        : userHasVerifiedEmail,
  });
}

export type WalletList = PaginatedList<'wallets', Wallet>;

export interface GetWalletsQuery extends ListRequestQuery {
  rank?: string;
}

export async function getWallets(api: ApiContext, query?: GetWalletsQuery): Promise<WalletList> {
  const { data } = await api.get<WalletList>('/wallets', query);
  return data;
}

export function useWallets(
  query?: GetWalletsQuery,
  options?: Omit<UseQueryOptions<WalletList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<WalletList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<WalletList, ApiError | AxiosError>(
    ['wallets', query],
    () => getWallets(api, query),
    options,
  );
}

export interface WalletBody extends RequestBody {
  owner?: string | null;
  name?: string | null;
  type?: string | null;
  is_default?: boolean;
  ethereum_address?: string | null;
}

export async function postWallet(api: ApiContext, body: WalletBody): Promise<Wallet> {
  const { data } = await api.post<Wallet, WalletBody>('/wallets', body);
  return data;
}

export function usePostWallet(
  options?: Omit<UseMutationOptions<Wallet, ApiError | AxiosError, WalletBody>, 'mutationFn'>,
): UseMutationResult<Wallet, ApiError | AxiosError, WalletBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Wallet, ApiError | AxiosError, WalletBody>(
    (body: WalletBody) => postWallet(api, body),
    {
      onSuccess(wallet: Wallet) {
        queryClient.setQueryData(['wallets', wallet.id], wallet);
      },
      ...options,
    },
  );
}

export async function putWallet(api: ApiContext, id: string, body: WalletBody) {
  const { data } = await api.put<Wallet, WalletBody>(`/wallets/${id}`, body);
  return data;
}

export type PutWalletVariables = WalletBody & { id: string };

export function usePutWallet(
  options?: Omit<UseMutationOptions<Wallet, ApiError | AxiosError, WalletBody>, 'mutationFn'>,
): UseMutationResult<Wallet, ApiError | AxiosError, PutWalletVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Wallet, ApiError | AxiosError, PutWalletVariables>(
    ({ id, ...body }: PutWalletVariables) => putWallet(api, id, body),
    {
      onSuccess(wallet: Wallet) {
        queryClient.setQueryData(['wallets', wallet.id], wallet);
      },
      ...options,
    },
  );
}

export interface PostWalletPictureBody extends RequestBody {
  picture: File;
}

export async function postWalletPicture(
  api: ApiContext,
  id: string,
  body: PostWalletPictureBody,
): Promise<Wallet> {
  const { data } = await api.post<Wallet>(`/wallets/${id}/picture`, body);
  return data;
}

export type PostWalletPictureVariables = PostWalletPictureBody & { id: string };

export function usePostWalletPicture(
  options?: Omit<
    UseMutationOptions<Wallet, ApiError | AxiosError, PostWalletPictureVariables>,
    'mutationFn'
  >,
): UseMutationResult<Wallet, ApiError | AxiosError, PostWalletPictureVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Wallet, ApiError | AxiosError, PostWalletPictureVariables>(
    ({ id, ...body }: PostWalletPictureVariables) => postWalletPicture(api, id, body),
    {
      onSuccess(wallet: Wallet) {
        queryClient.setQueryData(['wallets', wallet.id], wallet);
      },
      ...options,
    },
  );
}
