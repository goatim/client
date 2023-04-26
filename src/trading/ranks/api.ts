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
import { ApiContext, ApiError, PaginatedList, RequestBody, useApi } from '../../api';
import { Rank } from './model';

export async function getRank(api: ApiContext, id: string): Promise<Rank> {
  const { data } = await api.get<Rank>(`/ranks/${id}`);
  return data;
}

export function useRank(
  id?: string,
  options?: Omit<UseQueryOptions<Rank, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Rank, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Rank, ApiError | AxiosError>(['ranks', id], () => getRank(api, id as string), {
    ...options,
    enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
  });
}

export type RankList = PaginatedList<'ranks', Rank>;

export async function getRanks(api: ApiContext): Promise<RankList> {
  const { data } = await api.get<RankList>(`/rankings`);
  return data;
}

export function useRanks(
  options?: Omit<UseQueryOptions<RankList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<RankList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<RankList, ApiError | AxiosError>(['ranks'], () => getRanks(api), options);
}

export interface RankBody extends RequestBody {
  name?: string | null;
  description?: string | null;
  ranking?: string | null;
  level?: number | null;
  ceiling?: number | null;
}

export async function postRank(api: ApiContext, body: RankBody): Promise<Rank> {
  const { data } = await api.post<Rank, RankBody>('/ranks', body);
  return data;
}

export function usePostRank(
  options?: Omit<UseMutationOptions<Rank, ApiError | AxiosError, RankBody>, 'mutationFn'>,
): UseMutationResult<Rank, ApiError | AxiosError, RankBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Rank, ApiError | AxiosError, RankBody>(
    (body: RankBody) => postRank(api, body),
    {
      onSuccess(rank: Rank) {
        queryClient.setQueryData(['ranks', rank.id], rank);
      },
      ...options,
    },
  );
}

export async function putRank(api: ApiContext, id: string, body: RankBody): Promise<Rank> {
  const { data } = await api.put<Rank, RankBody>(`/ranks/${id}`, body);
  return data;
}

export type PutRankVariables = RankBody & { id: string };

export function usePutRank(
  options?: Omit<UseMutationOptions<Rank, ApiError | AxiosError, PutRankVariables>, 'mutationFn'>,
): UseMutationResult<Rank, ApiError | AxiosError, PutRankVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Rank, ApiError | AxiosError, PutRankVariables>(
    ({ id, ...body }: PutRankVariables) => putRank(api, id, body),
    {
      onSuccess(rank: Rank) {
        queryClient.setQueryData(['ranks', rank.id], rank);
      },
      ...options,
    },
  );
}

export async function deleteRank(api: ApiContext, id: string): Promise<void> {
  await api.delete<void>(`/ranks/${id}`);
}

export function useDeleteRank(
  options?: Omit<UseMutationOptions<void, ApiError | AxiosError, string>, 'mutationFn'>,
): UseMutationResult<void, ApiError | AxiosError, string> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, ApiError | AxiosError, string>((id) => deleteRank(api, id), {
    onSuccess(res, id) {
      queryClient.removeQueries(['ranks', id], { exact: true });
      // TODO : Remove in list
    },
    ...options,
  });
}
