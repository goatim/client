import { PaginatedList, RequestBody, RequestParams, useApi } from '@cezembre/fronts';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import Player from '../players/model';
import { useCurrentWallet } from '../../market/wallets/api';
import Composition from './model';

export interface UseCompositionParams extends RequestParams {
  match?: string;
}

export function useComposition(
  id = 'current',
  params?: UseCompositionParams,
): UseQueryResult<Composition> {
  const wallet = useCurrentWallet();
  const api = useApi();

  return useQuery<Composition>(['compositions', id, params, wallet.data?.id], async () => {
    const { data } = await api.get<Composition>(`/compositions/${id}`, {
      ...params,
      wallet: wallet.data?.id,
    });
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
  compositionKey = 'current',
): UseMutationResult<Composition, unknown, CompositionBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  const wallet = useCurrentWallet();
  return useMutation<Composition, unknown, CompositionBody>(
    async (body: CompositionBody) => {
      if (!body.wallet) {
        body.wallet = wallet.data?.id;
      }
      const { data } = await api.post<Composition>('/compositions', body);
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
  compositionKey = 'current',
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

      const composition = queryClient.getQueryData<Composition>(['compositions', compositionKey]);
      const { data } = await api.put<Composition>(
        `/compositions/${composition?.id || 'current'}`,
        saneBody,
      );
      return data;
    },
    {
      onSuccess(composition: Composition) {
        queryClient.setQueryData<Composition>(['compositions', compositionKey], composition);
      },
    },
  );
}

export function useDeleteComposition(
  compositionKey = 'current',
): UseMutationResult<void, unknown, void> {
  const wallet = useCurrentWallet();
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, unknown, void>(
    async () => {
      const composition = queryClient.getQueryData<Composition>(['compositions', compositionKey]);
      await api.delete<void>(`/checkouts/${composition?.id || 'current'}`, {
        wallet: wallet.data?.id,
      });
    },
    {
      onSuccess() {
        queryClient.removeQueries(['compositions', compositionKey], { exact: true });
      },
    },
  );
}
