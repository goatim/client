import { PaginatedList, RequestBody, RequestParams, useApi } from '@cezembre/fronts';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useMemo } from 'react';
import Player from '../players/model';
import { useCurrentWallet } from '../../market/wallets/api';
import Composition from './model';

export interface UseCompositionParams extends RequestParams {
  match?: string;
  wallet?: string;
}

export function useComposition(
  id = 'current',
  params?: UseCompositionParams,
): UseQueryResult<Composition> {
  const api = useApi();
  const wallet = useCurrentWallet();

  const memoizedParams = useMemo<UseCompositionParams | undefined>(() => {
    if (params?.wallet) {
      return params;
    }
    return {
      ...params,
      wallet: wallet.data?.id,
    };
  }, [params, wallet.data?.id]);

  return useQuery<Composition>(['compositions', id, memoizedParams], async () => {
    const { data } = await api.get<Composition>(`/compositions/${id}`, memoizedParams);
    return data;
  });
}

export type CompositionList = PaginatedList<'compositions', Composition>;

export function useCompositions(): UseQueryResult<CompositionList> {
  const api = useApi();
  return useQuery<CompositionList>('compositions', async () => {
    const { data } = await api.get<CompositionList>('/compositions');
    return data;
  });
}

export interface CompositionPositionBody extends RequestBody {
  id: string;
  player: Player | string | null;
}

export interface CompositionBody extends RequestBody {
  match?: string | null;
  wallet?: string | null;
  setting?: string | null;
  goalkeeper?: string | null;
  positions?: string | null;
  is_active?: boolean;
}

export function useCreateComposition(
  compositionKey?: string,
): UseMutationResult<Composition, unknown, CompositionBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  const wallet = useCurrentWallet();
  return useMutation<Composition, unknown, CompositionBody>(
    async (body: CompositionBody) => {
      const saneBody = JSON.parse(JSON.stringify(body)) as CompositionBody;

      if (!saneBody.wallet) {
        saneBody.wallet = wallet.data?.id;
      }

      if (!body.wallet) {
        body.wallet = wallet.data?.id;
      }
      const { data } = await api.post<Composition>('/compositions', saneBody);
      return data;
    },
    {
      onSuccess(composition: Composition) {
        queryClient.setQueryData(['compositions', compositionKey || composition.id], composition);
      },
    },
  );
}

export function useUpdateComposition(
  id = 'current',
): UseMutationResult<Composition, unknown, CompositionBody> {
  const wallet = useCurrentWallet();
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Composition, unknown, CompositionBody>(
    async (body: CompositionBody) => {
      const saneBody = JSON.parse(JSON.stringify(body)) as CompositionBody;

      if (!saneBody.wallet) {
        saneBody.wallet = wallet.data?.id;
      }

      const { data } = await api.put<Composition>(`/compositions/${id}`, saneBody);
      return data;
    },
    {
      onSuccess(composition: Composition) {
        queryClient.setQueryData<Composition>(['compositions', id], composition);
      },
    },
  );
}

export function useDeleteComposition(id = 'current'): UseMutationResult<void, unknown, void> {
  const wallet = useCurrentWallet();
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, unknown, void>(
    async () => {
      await api.delete<void>(`/checkouts/${id}`, {
        wallet: wallet.data?.id,
      });
    },
    {
      onSuccess() {
        queryClient.removeQueries(['compositions', id], { exact: true });
      },
    },
  );
}
