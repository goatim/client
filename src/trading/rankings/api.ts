import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { PaginatedList, RequestBody, RequestQuery, useApi } from '../../api';
import Ranking, { RankingPeriod } from './model';

export type GetRankingQuery = RequestQuery;

export function useRanking(id?: string, query?: GetRankingQuery): UseQueryResult<Ranking> {
  const api = useApi();
  return useQuery<Ranking>(
    ['rankings', id, query],
    async () => {
      const { data } = await api.get<Ranking>(`/rankings/${id}`, query);
      return data;
    },
    { enabled: !!id },
  );
}

export type RankingList = PaginatedList<'rankings', Ranking>;

export function useRankings(): UseQueryResult<RankingList> {
  const api = useApi();
  return useQuery<RankingList>('rankings', async () => {
    const { data } = await api.get<RankingList>(`/rankings`);
    return data;
  });
}

export interface RankingBody extends RequestBody {
  name?: string | null;
  description?: string | null;
  period?: RankingPeriod | null;
  from?: string | null;
  to?: string | null;
  is_default?: boolean;
}

export function usePostRanking(): UseMutationResult<Ranking, unknown, RankingBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Ranking, unknown, RankingBody>(
    async (body: RankingBody) => {
      const { data } = await api.post<Ranking>('/rankings', body);
      return data;
    },
    {
      onSuccess(ranking: Ranking) {
        queryClient.setQueryData(['rankings', ranking.id], ranking);
      },
    },
  );
}

export type PutRankingVariables = RankingBody & { id: string };

export function usePutRanking(): UseMutationResult<Ranking, unknown, PutRankingVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Ranking, unknown, PutRankingVariables>(
    async ({ id, ...body }: PutRankingVariables) => {
      const { data } = await api.put<Ranking>(`/rankings/${id}`, body);
      return data;
    },
    {
      onSuccess(ranking: Ranking) {
        queryClient.setQueryData(['rankings', ranking.id], ranking);
      },
    },
  );
}

export function useDeleteRanking(id: string): UseMutationResult<void, unknown, void> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, unknown, void>(
    async () => {
      await api.delete<void>(`/rankings/${id}`);
    },
    {
      onSuccess() {
        queryClient.removeQueries(['rankings', id], { exact: true });
        // TODO : Remove in list
      },
    },
  );
}
