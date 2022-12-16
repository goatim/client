import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { ListRequestQuery, PaginatedList, RequestBody, useApi } from '../../api';
import BoosterFactory from './model';
import { useCurrentWallet } from '../../market/wallets/api';

export function useBoosterFactory(id?: string): UseQueryResult<BoosterFactory> {
  const api = useApi();
  return useQuery<BoosterFactory>(
    ['booster_factories', id],
    async () => {
      const { data } = await api.get<BoosterFactory>(`/booster_factories/${id}`);
      return data;
    },
    { enabled: !!id },
  );
}

export type BoosterFactoryList = PaginatedList<'booster_factories', BoosterFactory>;

export interface GetBoosterFactoriesQuery extends ListRequestQuery {
  wallet?: string;
}

export function useBoosterFactories(
  query?: GetBoosterFactoriesQuery,
): UseQueryResult<BoosterFactoryList> {
  const api = useApi();
  return useQuery<BoosterFactoryList>(['booster_factories', query], async () => {
    const { data } = await api.get<BoosterFactoryList>('/booster_factories', query);
    return data;
  });
}

export function useCurrentWalletBoosterFactories(
  query: Omit<GetBoosterFactoriesQuery, 'wallet'>,
): UseQueryResult<BoosterFactoryList> {
  const wallet = useCurrentWallet();
  return useBoosterFactories({ ...query, wallet: wallet.data?.id });
}

export interface BoosterFactoryBody extends RequestBody {
  name?: string | null;
  description?: string | null;
  price?: number;
  vat?: string | null;
  leverage?: number;
  duration?: number;
}

export function usePostBoosterFactory(): UseMutationResult<
  BoosterFactory,
  unknown,
  BoosterFactoryBody
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<BoosterFactory, unknown, BoosterFactoryBody>(
    async (body: BoosterFactoryBody) => {
      const { data } = await api.post<BoosterFactory, BoosterFactoryBody>(
        '/booster_factories',
        body,
      );
      return data;
    },
    {
      onSuccess(boosterFactory: BoosterFactory) {
        queryClient.setQueryData(['booster_factories', boosterFactory.id], boosterFactory);
      },
    },
  );
}

export type PutBoosterFactoryVariables = BoosterFactoryBody & { id: string };

export function usePutBoosterFactory(): UseMutationResult<
  BoosterFactory,
  unknown,
  PutBoosterFactoryVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<BoosterFactory, unknown, PutBoosterFactoryVariables>(
    async ({ id, ...body }: PutBoosterFactoryVariables) => {
      const { data } = await api.put<BoosterFactory, BoosterFactoryBody>(
        `/booster_factories/${id}`,
        body,
      );
      return data;
    },
    {
      onSuccess(boosterFactory: BoosterFactory) {
        queryClient.setQueryData(['booster_factories', boosterFactory.id], boosterFactory);
      },
    },
  );
}

export function useDeleteBoosterFactory(id: string): UseMutationResult<void, unknown, void> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, unknown, void>(
    async () => {
      await api.delete<void>(`/booster_factories/${id}`);
    },
    {
      onSuccess() {
        queryClient.removeQueries(['booster_factories', id], { exact: true });
        // TODO : Remove in list
      },
    },
  );
}
