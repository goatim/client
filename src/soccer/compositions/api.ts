import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useMemo } from 'react';
import { PaginatedList, RequestBody, RequestQuery, useApi } from '../../api';
import Player from '../players/model';
import { useCurrentWallet } from '../../market/wallets/api';
import Composition from './model';

export interface GetCompositionQuery extends RequestQuery {
  match?: string;
  wallet?: string;
}

export function useComposition(
  id = 'current',
  query?: GetCompositionQuery,
): UseQueryResult<Composition> {
  const api = useApi();
  const wallet = useCurrentWallet();

  const memoizedQuery = useMemo<GetCompositionQuery | undefined>(() => {
    if (query?.wallet) {
      return query;
    }
    return {
      ...query,
      wallet: wallet.data?.id,
    };
  }, [query, wallet.data?.id]);

  return useQuery<Composition>(['compositions', id, memoizedQuery], async () => {
    const { data } = await api.get<Composition>(`/compositions/${id}`, memoizedQuery);
    return data;
  });
}

export interface GetCompositionsQuery extends RequestQuery {
  match?: string;
  wallet?: string;
  is_valid?: string;
  is_active?: string;
}

export type CompositionList = PaginatedList<'compositions', Composition>;

export function useCompositions(query?: GetCompositionsQuery): UseQueryResult<CompositionList> {
  const api = useApi();
  return useQuery<CompositionList>(['compositions', query], async () => {
    const { data } = await api.get<CompositionList>('/compositions', query);
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
  query?: GetCompositionQuery,
): UseMutationResult<Composition, unknown, CompositionBody> {
  const wallet = useCurrentWallet();
  const api = useApi();
  const queryClient = useQueryClient();

  const memoizedQuery = useMemo<GetCompositionQuery | undefined>(() => {
    if (query?.wallet) {
      return query;
    }
    return {
      ...query,
      wallet: wallet.data?.id,
    };
  }, [query, wallet.data?.id]);

  return useMutation<Composition, unknown, CompositionBody>(
    async (body: CompositionBody) => {
      const saneBody = JSON.parse(JSON.stringify(body)) as CompositionBody;

      if (!saneBody.wallet) {
        saneBody.wallet = wallet.data?.id;
      }

      const { data } = await api.put<Composition>(`/compositions/${id}`, saneBody, memoizedQuery);
      return data;
    },
    {
      onSuccess(composition: Composition) {
        queryClient.setQueryData<Composition>(['compositions', id, memoizedQuery], composition);
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
