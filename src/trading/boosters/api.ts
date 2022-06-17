import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { PaginatedList, RequestBody, RequestParams, useApi } from '../../api';
import Booster from './model';
import { useCurrentWallet } from '../../market/wallets/api';

export function useBooster(id?: string): UseQueryResult<Booster> {
  const api = useApi();
  return useQuery<Booster>(
    ['boosters', id],
    async () => {
      const { data } = await api.get<Booster>(`/boosters/${id}`);
      return data;
    },
    { enabled: !!id },
  );
}

export type BoosterList = PaginatedList<'boosters', Booster>;

export interface UseBoostersParams extends RequestParams {
  booster?: string;
  wallet?: string;
}

export function useBoosters(params?: UseBoostersParams): UseQueryResult<BoosterList> {
  const api = useApi();
  return useQuery<BoosterList>(['boosters', params], async () => {
    const { data } = await api.get<BoosterList>('/boosters', params);
    return data;
  });
}

export function useCurrentWalletBoosters(
  params: Omit<UseBoostersParams, 'wallet'>,
): UseQueryResult<BoosterList> {
  const wallet = useCurrentWallet();
  return useBoosters({ ...params, wallet: wallet.data?.id });
}

export interface BoosterBody extends RequestBody {
  name?: string | null;
  description?: string | null;
  price?: number;
  vat?: string | null;
  leverage?: number;
}

export function useCreateBooster(): UseMutationResult<Booster, unknown, BoosterBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Booster, unknown, BoosterBody>(
    async (body: BoosterBody) => {
      const { data } = await api.post<Booster>('/boosters', body);
      return data;
    },
    {
      onSuccess(booster: Booster) {
        queryClient.setQueryData(['boosters', booster.id], booster);
      },
    },
  );
}

export type UpdateBoosterVariables = BoosterBody & { id: string };

export function useUpdateBooster(): UseMutationResult<Booster, unknown, UpdateBoosterVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Booster, unknown, UpdateBoosterVariables>(
    async ({ id, ...body }: UpdateBoosterVariables) => {
      const { data } = await api.put<Booster>(`/boosters/${body}`, body);
      return data;
    },
    {
      onSuccess(booster: Booster) {
        queryClient.setQueryData(['boosters', booster.id], booster);
      },
    },
  );
}

export function useDeleteBooster(id: string): UseMutationResult<void, unknown, void> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, unknown, void>(
    async () => {
      await api.delete<void>(`/boosters/${id}`);
    },
    {
      onSuccess() {
        queryClient.removeQueries(['boosters', id], { exact: true });
        // TODO : Remove in list
      },
    },
  );
}
