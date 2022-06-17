import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { PaginatedList, RequestBody, RequestParams, useApi } from '../../api';
import Wallet from './model';
import { useFridayClient } from '../../client';

export interface UseWalletParams extends RequestParams {
  ranking?: string;
}

export function useWallet(id: string, params?: UseWalletParams): UseQueryResult<Wallet> {
  const api = useApi();
  return useQuery<Wallet>(['wallets', id], async () => {
    const { data } = await api.get<Wallet>(`/wallets/${id}`, params);
    return data;
  });
}

export function useDefaultWallet(params?: UseWalletParams): UseQueryResult<Wallet> {
  return useWallet('default', params);
}

export function useCurrentWallet(params?: UseWalletParams): UseQueryResult<Wallet> {
  const { wallet } = useFridayClient();
  return useWallet(wallet || 'default', params);
}

export type WalletList = PaginatedList<'wallets', Wallet>;

export interface UseWalletsParams extends RequestParams {
  rank?: string;
  order?: string;
}

export function useWallets(params?: UseWalletsParams): UseQueryResult<WalletList> | undefined {
  const api = useApi();
  return useQuery<WalletList>(['wallets', params], async () => {
    const { data } = await api.get<WalletList>('/wallets', params);
    return data;
  });
}

export interface WalletBody extends RequestBody {
  owner?: string | null;
  name?: string | null;
  type?: string | null;
  amount?: number;
  is_default?: boolean;
}

export function useCreateWallet(): UseMutationResult<Wallet, unknown, WalletBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Wallet, unknown, WalletBody>(
    async (body: WalletBody) => {
      const { data } = await api.post<Wallet>('/wallets', body);
      return data;
    },
    {
      onSuccess(wallet: Wallet) {
        queryClient.setQueryData(['wallets', wallet.id], wallet);
      },
    },
  );
}

export type UpdateWalletVariables = WalletBody & { id: string };

export function useUpdateWallet(): UseMutationResult<Wallet, unknown, UpdateWalletVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Wallet, unknown, UpdateWalletVariables>(
    async ({ id, ...body }: UpdateWalletVariables) => {
      const { data } = await api.put<Wallet>(`/wallets/${body}`, body);
      return data;
    },
    {
      onSuccess(wallet: Wallet) {
        queryClient.setQueryData(['wallets', wallet.id], wallet);
      },
    },
  );
}

export type AddWalletPictureBody = { picture: File };

export type AddWalletPictureVariables = AddWalletPictureBody & { id: string };

export function useAddWalletPicture(): UseMutationResult<
  Wallet,
  unknown,
  AddWalletPictureVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Wallet, unknown, AddWalletPictureVariables>(
    async ({ id, picture }: AddWalletPictureVariables) => {
      const { data } = await api.post<Wallet>(`/wallets/${id}/picture`, { picture });
      return data;
    },
    {
      onSuccess(wallet: Wallet) {
        queryClient.setQueryData(['wallets', wallet.id], wallet);
      },
    },
  );
}