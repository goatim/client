import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { PaginatedList, RequestBody, useApi } from '../../api';
import Rank from './model';

export function useRank(id?: string): UseQueryResult<Rank> {
  const api = useApi();
  return useQuery<Rank>(
    ['ranks', id],
    async () => {
      const { data } = await api.get<Rank>(`/ranks/${id}`);
      return data;
    },
    { enabled: !!id },
  );
}

export type RankList = PaginatedList<'ranks', Rank>;

export function useRanks(): UseQueryResult<RankList> {
  const api = useApi();
  return useQuery<RankList>('ranks', async () => {
    const { data } = await api.get<RankList>(`/ranks`);
    return data;
  });
}

export interface RankBody extends RequestBody {
  name?: string | null;
  description?: string | null;
  ranking?: string | null;
  level?: number | null;
  ceiling?: number | null;
}

export function usePostRank(): UseMutationResult<Rank, unknown, RankBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Rank, unknown, RankBody>(
    async (body: RankBody) => {
      const { data } = await api.post<Rank, RankBody>('/ranks', body);
      return data;
    },
    {
      onSuccess(rank: Rank) {
        queryClient.setQueryData(['ranks', rank.id], rank);
      },
    },
  );
}

export type PutRankVariables = RankBody & { id: string };

export function usePutRank(): UseMutationResult<Rank, unknown, PutRankVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Rank, unknown, PutRankVariables>(
    async ({ id, ...body }: PutRankVariables) => {
      const { data } = await api.put<Rank, RankBody>(`/ranks/${id}`, body);
      return data;
    },
    {
      onSuccess(rank: Rank) {
        queryClient.setQueryData(['ranks', rank.id], rank);
      },
    },
  );
}

export function useDeleteRank(id: string): UseMutationResult<void, unknown, void> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, unknown, void>(
    async () => {
      await api.delete<void>(`/ranks/${id}`);
    },
    {
      onSuccess() {
        queryClient.removeQueries(['ranks', id], { exact: true });
        // TODO : Remove in list
      },
    },
  );
}
