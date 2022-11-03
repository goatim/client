import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import Wallet from './model';
import { ListRequestQuery, PaginatedList, RequestQuery, useApi } from '../../api';
import { useFridayClient } from '../../client';

export interface GetWalletQuery extends RequestQuery {
  ranking?: string;
}

export function useWallet(id?: string, query?: GetWalletQuery): UseQueryResult<Wallet> {
  const api = useApi();
  return useQuery<Wallet>(
    ['wallets', id, query],
    async () => {
      const { data } = await api.get<Wallet, RequestQuery>(`/wallets/${id}`, query);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export function useDefaultWallet(query?: GetWalletQuery): UseQueryResult<Wallet> {
  return useWallet('default', query);
}

export function useCurrentWallet(query?: GetWalletQuery): UseQueryResult<Wallet> {
  const { wallet } = useFridayClient();
  return useWallet(wallet || 'default', query);
}

export type WalletList = PaginatedList<'wallets', Wallet>;

export interface GetWalletsQuery extends ListRequestQuery {
  rank?: string;
}

export function useWallets(query?: GetWalletsQuery): UseQueryResult<WalletList> | undefined {
  const api = useApi();
  return useQuery<WalletList>(['wallets', query], async () => {
    const { data } = await api.get<WalletList>('/wallets', query);
    return data;
  });
}

export interface WalletBody {
  owner?: string | null;
  name?: string | null;
  type?: string | null;
  is_default?: boolean;
  ethereum_address?: string | null;
}

export function usePostWallet(): UseMutationResult<Wallet, unknown, WalletBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Wallet, unknown, WalletBody>(
    async (body: WalletBody) => {
      const { data } = await api.post<Wallet, WalletBody>('/wallets', body);
      return data;
    },
    {
      onSuccess(wallet: Wallet) {
        queryClient.setQueryData(['wallets', wallet.id], wallet);
      },
    },
  );
}

export type PutWalletVariables = WalletBody & { id: string };

export function usePutWallet(): UseMutationResult<Wallet, unknown, PutWalletVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Wallet, unknown, PutWalletVariables>(
    async ({ id, ...body }: PutWalletVariables) => {
      const { data } = await api.put<Wallet, WalletBody>(`/wallets/${id}`, body);
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
