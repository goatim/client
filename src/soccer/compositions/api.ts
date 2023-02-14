import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useMemo } from 'react';
import { UseQueryOptions } from 'react-query/types/react/types';
import { ListRequestQuery, PaginatedList, RequestBody, RequestQuery, useApi } from '../../api';
import Player from '../players/model';
import { useActiveWallet } from '../../market/wallets/api';
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
  const wallet = useActiveWallet();

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

export interface GetCompositionsQuery extends ListRequestQuery {
  match?: string;
  wallet?: string;
  is_valid?: boolean;
  is_active?: boolean;
}

export type CompositionList = PaginatedList<'compositions', Composition>;

export function useCompositions(
  query?: GetCompositionsQuery,
  options?: UseQueryOptions<CompositionList>,
): UseQueryResult<CompositionList> {
  const api = useApi();
  return useQuery<CompositionList>(
    ['compositions', query],
    async () => {
      const { data } = await api.get<CompositionList>('/compositions', query);
      return data;
    },
    options,
  );
}

export interface CompositionPositionBody {
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

export function usePostComposition(
  compositionKey?: string,
): UseMutationResult<Composition, unknown, CompositionBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  const wallet = useActiveWallet();
  return useMutation<Composition, unknown, CompositionBody>(
    async (body: CompositionBody) => {
      const saneBody = JSON.parse(JSON.stringify(body)) as CompositionBody;

      if (!saneBody.wallet) {
        saneBody.wallet = wallet.data?.id;
      }

      if (!body.wallet) {
        body.wallet = wallet.data?.id;
      }
      const { data } = await api.post<Composition, CompositionBody>('/compositions', saneBody);
      return data;
    },
    {
      onSuccess(composition: Composition) {
        queryClient.setQueryData(['compositions', compositionKey || composition.id], composition);
      },
    },
  );
}

export function usePutComposition(
  id = 'current',
  query?: GetCompositionQuery,
): UseMutationResult<Composition, unknown, CompositionBody> {
  const wallet = useActiveWallet();
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

      const { data } = await api.put<Composition, CompositionBody>(
        `/compositions/${id}`,
        saneBody,
        memoizedQuery,
      );
      return data;
    },
    {
      onSuccess(composition: Composition) {
        queryClient.setQueryData<Composition>(['compositions', id, memoizedQuery], composition);
      },
    },
  );
}

export interface DeleteCompositionQuery extends RequestQuery {
  wallet?: string;
}

export function useDeleteComposition(id = 'current'): UseMutationResult<void, unknown, void> {
  const wallet = useActiveWallet();
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, unknown, void>(
    async () => {
      await api.delete<void, DeleteCompositionQuery>(`/checkouts/${id}`, {
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
