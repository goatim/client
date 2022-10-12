import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { ListRequestQuery, PaginatedList, useApi } from '../../api';
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

export interface GetBoostersQuery extends ListRequestQuery {
  wallet?: string;
  order?: string;
  portfolio?: string;
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

export interface BoosterBody {
  wallet?: string | null;
  order?: string | null;
  portfolio?: string | null;
  leverage?: number;
  duration?: number;
}

export function usePostBooster(): UseMutationResult<Booster, unknown, BoosterBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Booster, unknown, BoosterBody>(
    async (body: BoosterBody) => {
      const { data } = await api.post<Booster, BoosterBody>('/boosters', body);
      return data;
    },
    {
      onSuccess(booster: Booster) {
        queryClient.setQueryData(['boosters', booster.id], booster);
      },
    },
  );
}

export type PutBoosterVariables = BoosterBody & { id: string };

export function usePutBooster(): UseMutationResult<Booster, unknown, PutBoosterVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Booster, unknown, PutBoosterVariables>(
    async ({ id, ...body }: PutBoosterVariables) => {
      const { data } = await api.put<Booster, BoosterBody>(`/boosters/${id}`, body);
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
