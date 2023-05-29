import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiContext, ApiError, PaginatedList, useApi } from '../../api';
import { Ranking, RankingPeriod } from './model';

export async function getRanking(api: ApiContext, id: string): Promise<Ranking> {
  const { data } = await api.get<Ranking>(`/rankings/${id}`);
  return data;
}

export function useRanking(
  id?: string,
  options?: Omit<UseQueryOptions<Ranking, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Ranking, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Ranking, ApiError | AxiosError>(
    ['rankings', id],
    async () => getRanking(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type RankingList = PaginatedList<'rankings', Ranking>;

export async function getRankings(api: ApiContext): Promise<RankingList> {
  const { data } = await api.get<RankingList>(`/rankings`);
  return data;
}

export function useRankings(
  options?: Omit<UseQueryOptions<RankingList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<RankingList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<RankingList, ApiError | AxiosError>(
    ['rankings'],
    () => getRankings(api),
    options,
  );
}

export interface RankingBody {
  name?: string | null;
  description?: string | null;
  period?: RankingPeriod | null;
  from?: string | null;
  to?: string | null;
  is_default?: boolean;
}

export async function postRanking(api: ApiContext, body: RankingBody): Promise<Ranking> {
  const { data } = await api.post<Ranking, RankingBody>('/rankings', body);
  return data;
}

export function usePostRanking(
  options?: Omit<UseMutationOptions<Ranking, ApiError | AxiosError, RankingBody>, 'mutationFn'>,
): UseMutationResult<Ranking, ApiError | AxiosError, RankingBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Ranking, ApiError | AxiosError, RankingBody>(
    (body: RankingBody) => postRanking(api, body),
    {
      onSuccess(ranking: Ranking) {
        queryClient.setQueryData(['rankings', ranking.id], ranking);
      },
      ...options,
    },
  );
}

export async function putRanking(api: ApiContext, id: string, body: RankingBody): Promise<Ranking> {
  const { data } = await api.put<Ranking, RankingBody>(`/rankings/${id}`, body);
  return data;
}

export type PutRankingVariables = RankingBody & { id: string };

export function usePutRanking(
  options?: Omit<
    UseMutationOptions<Ranking, ApiError | AxiosError, PutRankingVariables>,
    'mutationFn'
  >,
): UseMutationResult<Ranking, ApiError | AxiosError, PutRankingVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Ranking, ApiError | AxiosError, PutRankingVariables>(
    ({ id, ...body }: PutRankingVariables) => putRanking(api, id, body),
    {
      onSuccess(ranking: Ranking) {
        queryClient.setQueryData(['rankings', ranking.id], ranking);
      },
      ...options,
    },
  );
}

export async function deleteRanking(api: ApiContext, id: string): Promise<void> {
  await api.delete<void>(`/rankings/${id}`);
}

export function useDeleteRanking(
  options?: Omit<UseMutationOptions<void, ApiError | AxiosError, string>, 'mutationFn'>,
): UseMutationResult<void, ApiError | AxiosError, string> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, ApiError | AxiosError, string>((id) => deleteRanking(api, id), {
    onSuccess(res, id) {
      queryClient.removeQueries(['rankings', id], { exact: true });
      // TODO : Remove in list
    },
    ...options,
  });
}
