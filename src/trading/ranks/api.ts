import { PaginatedList, RequestBody, useApi } from '@cezembre/fronts';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
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

export function useCreateRank(): UseMutationResult<Rank, unknown, RankBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Rank, unknown, RankBody>(
    async (body: RankBody) => {
      const { data } = await api.post<Rank>('/ranks', body);
      return data;
    },
    {
      onSuccess(rank: Rank) {
        queryClient.setQueryData(['ranks', rank.id], rank);
      },
    },
  );
}

export type UpdateRankVariables = RankBody & { id: string };

export function useUpdateRank(): UseMutationResult<Rank, unknown, UpdateRankVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Rank, unknown, UpdateRankVariables>(
    async ({ id, ...body }: UpdateRankVariables) => {
      const { data } = await api.put<Rank>(`/ranks/${body}`, body);
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
