import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { PaginatedList, RequestBody, RequestQuery, useApi } from '../../api';
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

export interface GetBoostersQuery extends RequestQuery {
  booster?: string;
  wallet?: string;
}

export function useBoosters(query?: GetBoostersQuery): UseQueryResult<BoosterList> {
  const api = useApi();
  return useQuery<BoosterList>(['boosters', query], async () => {
    const { data } = await api.get<BoosterList>('/boosters', query);
    return data;
  });
}

export function useCurrentWalletBoosters(
  query: Omit<GetBoostersQuery, 'wallet'>,
): UseQueryResult<BoosterList> {
  const wallet = useCurrentWallet();
  return useBoosters({ ...query, wallet: wallet.data?.id });
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
      const { data } = await api.put<Booster>(`/boosters/${id}`, body);
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
