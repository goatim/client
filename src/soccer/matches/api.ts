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
import { Match, MatchStatus } from './model';

export async function getMatch(api: ApiContext, id: string): Promise<Match> {
  const { data } = await api.get<Match>(`/matches/${id}`);
  return data;
}

export function useMatch(
  id?: string,
  options?: Omit<UseQueryOptions<Match, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Match, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Match, ApiError | AxiosError>(
    ['matches', id],
    () => getMatch(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type MatchList = PaginatedList<'matches', Match>;

export interface GetMatchesQuery extends ListRequestQuery {
  status?: MatchStatus;
  spotlight?: boolean;
  tournament?: string;
  search?: string;
}

export async function getMatches(api: ApiContext, query?: GetMatchesQuery): Promise<MatchList> {
  const { data } = await api.get<MatchList>('/matches', query);
  return data;
}

export function useMatches(
  query?: GetMatchesQuery,
  options?: Omit<UseQueryOptions<MatchList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<MatchList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<MatchList, ApiError | AxiosError>(
    ['matches', query],
    () => getMatches(api, query),
    options,
  );
}

export function useSpotlightMatches(
  query?: Omit<GetMatchesQuery, 'spotlight'>,
  options?: Omit<UseQueryOptions<MatchList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<MatchList> {
  return useMatches({ spotlight: true, ...query }, options);
}

export interface MatchBody {
  title?: string | null;
  description?: string | null;
  beginning?: string | null;
  end?: string | null;
  is_public?: boolean;
  status?: MatchStatus | null;
}

export async function postMatch(api: ApiContext, body: MatchBody): Promise<Match> {
  const { data } = await api.post<Match, MatchBody>('/matches', body);
  return data;
}

export function usePostMatch(
  options?: Omit<UseMutationOptions<Match, ApiError | AxiosError, MatchBody>, 'mutationFn'>,
): UseMutationResult<Match, ApiError | AxiosError, MatchBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Match, ApiError | AxiosError, MatchBody>(
    (body: MatchBody) => postMatch(api, body),
    {
      onSuccess(match: Match) {
        queryClient.setQueryData(['matches', match.id], match);
      },
      ...options,
    },
  );
}

export async function putMatch(api: ApiContext, id: string, body: MatchBody): Promise<Match> {
  const { data } = await api.put<Match, MatchBody>(`/matches/${id}`, body);
  return data;
}

export type PutMatchVariables = MatchBody & { id: string };

export function usePutMatch(
  options?: Omit<UseMutationOptions<Match, ApiError | AxiosError, PutMatchVariables>, 'mutationFn'>,
): UseMutationResult<Match, ApiError | AxiosError, PutMatchVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Match, ApiError | AxiosError, PutMatchVariables>(
    async ({ id, ...body }: PutMatchVariables) => putMatch(api, id, body),
    {
      onSuccess(match: Match) {
        queryClient.setQueryData(['matches', match.id], match);
      },
      ...options,
    },
  );
}

export interface PostMatchIconBody {
  icon: File;
}

export async function postMatchIcon(
  api: ApiContext,
  id: string,
  body: PostMatchIconBody,
): Promise<Match> {
  const { data } = await api.post<Match, PostMatchIconBody>(`/matches/${id}/icon`, body);
  return data;
}

export type PostMatchIconVariables = PostMatchIconBody & { id: string };

export function usePostMatchIcon(
  options?: Omit<
    UseMutationOptions<Match, ApiError | AxiosError, PostMatchIconVariables>,
    'mutationFn'
  >,
): UseMutationResult<Match, ApiError | AxiosError, PostMatchIconVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Match, ApiError | AxiosError, PostMatchIconVariables>(
    ({ id, ...body }: PostMatchIconVariables) => postMatchIcon(api, id, body),
    {
      onSuccess(match: Match) {
        queryClient.setQueryData(['matches', match.id], match);
      },
      ...options,
    },
  );
}
