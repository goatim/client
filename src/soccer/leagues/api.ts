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
import { ApiContext, ApiError, ListRequestQuery, PaginatedList, useApi } from '../../api';
import { League } from './model';

export async function getLeague(api: ApiContext, id: string): Promise<League> {
  const { data } = await api.get<League>(`/leagues/${id}`);
  return data;
}

export function useLeague(
  id?: string,
  options?: Omit<UseQueryOptions<League, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<League> {
  const api = useApi();
  return useQuery<League, ApiError | AxiosError>(
    ['leagues', id],
    () => getLeague(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type LeagueList = PaginatedList<'leagues', League>;

export interface GetLeaguesQuery extends ListRequestQuery {
  name?: string;
  slug?: string;
  id?: string;
}

export async function getLeagues(api: ApiContext, query?: GetLeaguesQuery): Promise<LeagueList> {
  const { data } = await api.get<LeagueList>('/leagues', query);
  return data;
}

export function useLeagues(
  query?: GetLeaguesQuery,
  options?: Omit<UseQueryOptions<LeagueList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<LeagueList> {
  const api = useApi();
  return useQuery<LeagueList, ApiError | AxiosError>(
    ['leagues', query],
    () => getLeagues(api, query),
    options,
  );
}

export interface LeagueBody {
  name?: string | null;
  description?: string | null;
}

export async function postLeague(api: ApiContext, body: LeagueBody): Promise<League> {
  const { data } = await api.post<League, LeagueBody>('/leagues', body);
  return data;
}

export function usePostLeague(
  options?: Omit<UseMutationOptions<League, ApiError | AxiosError, LeagueBody>, 'mutationFn'>,
): UseMutationResult<League, ApiError | AxiosError, LeagueBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<League, ApiError | AxiosError, LeagueBody>(
    (body: LeagueBody) => postLeague(api, body),
    {
      onSuccess(league: League) {
        queryClient.setQueryData(['leagues', league.id], league);
      },
      ...options,
    },
  );
}

export async function putLeague(api: ApiContext, id: string, body: LeagueBody): Promise<League> {
  const { data } = await api.put<League, LeagueBody>(`/leagues/${id}`, body);
  return data;
}

export type PutLeagueVariables = LeagueBody & { id: string };

export function usePutLeague(
  options?: Omit<
    UseMutationOptions<League, ApiError | AxiosError, PutLeagueVariables>,
    'mutationFn'
  >,
): UseMutationResult<League, ApiError | AxiosError, PutLeagueVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<League, ApiError | AxiosError, PutLeagueVariables>(
    ({ id, ...body }: PutLeagueVariables) => putLeague(api, id, body),
    {
      onSuccess(league: League) {
        queryClient.setQueryData(['leagues', league.id], league);
      },
      ...options,
    },
  );
}

export interface PostLeagueIconBody {
  icon: File;
}

export async function postLeagueIcon(
  api: ApiContext,
  id: string,
  body: PostLeagueIconBody,
): Promise<League> {
  const { data } = await api.post<League, PostLeagueIconBody>(`/leagues/${id}/icon`, body);
  return data;
}

export type PostLeagueIconVariables = PostLeagueIconBody & { id: string };

export function usePostLeagueIcon(
  options?: Omit<
    UseMutationOptions<League, ApiError | AxiosError, PostLeagueIconVariables>,
    'mutationFn'
  >,
): UseMutationResult<League, ApiError | AxiosError, PostLeagueIconVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<League, ApiError | AxiosError, PostLeagueIconVariables>(
    ({ id, ...body }: PostLeagueIconVariables) => postLeagueIcon(api, id, body),
    {
      onSuccess(league: League) {
        queryClient.setQueryData(['leagues', league.id], league);
      },
      ...options,
    },
  );
}
