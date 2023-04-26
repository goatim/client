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
import {
  ApiContext,
  ApiError,
  ListRequestQuery,
  PaginatedList,
  RequestBody,
  useApi,
} from '../../api';
import { Tournament } from './model';

export async function getTournament(api: ApiContext, id: string): Promise<Tournament> {
  const { data } = await api.get<Tournament>(`/tournaments/${id}`);
  return data;
}

export function useTournament(
  id?: string,
  options?: Omit<UseQueryOptions<Tournament, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Tournament, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Tournament, ApiError | AxiosError>(
    ['tournaments', id],
    () => getTournament(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type TournamentList = PaginatedList<'tournaments', Tournament>;

export type GetTournamentsQuery = ListRequestQuery;

export async function getTournaments(
  api: ApiContext,
  query?: GetTournamentsQuery,
): Promise<TournamentList> {
  const { data } = await api.get<TournamentList, GetTournamentsQuery>('/tournaments', query);
  return data;
}

export function useTournaments(
  query?: GetTournamentsQuery,
  options?: Omit<UseQueryOptions<TournamentList, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<TournamentList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<TournamentList, ApiError | AxiosError>(
    ['tournaments', query],
    () => getTournaments(api, query),
    options,
  );
}

export interface TournamentBody extends RequestBody {
  title?: string | null;
  description?: string | null;
}

export async function postTournament(api: ApiContext, body: TournamentBody): Promise<Tournament> {
  const { data } = await api.post<Tournament, TournamentBody>('/tournaments', body);
  return data;
}

export function usePostTournament(
  options?: Omit<
    UseMutationOptions<Tournament, ApiError | AxiosError, TournamentBody>,
    'mutationFn'
  >,
): UseMutationResult<Tournament, ApiError | AxiosError, TournamentBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Tournament, ApiError | AxiosError, TournamentBody>(
    (body: TournamentBody) => postTournament(api, body),
    {
      onSuccess(tournament: Tournament) {
        queryClient.setQueryData(['tournaments', tournament.id], tournament);
      },
      ...options,
    },
  );
}

export async function putTournament(
  api: ApiContext,
  id: string,
  body: TournamentBody,
): Promise<Tournament> {
  const { data } = await api.put<Tournament, TournamentBody>(`/tournaments/${id}`, body);
  return data;
}

export type PutTournamentVariables = TournamentBody & { id: string };

export function usePutTournament(
  options?: Omit<
    UseMutationOptions<Tournament, ApiError | AxiosError, PutTournamentVariables>,
    'mutationFn'
  >,
): UseMutationResult<Tournament, ApiError | AxiosError, PutTournamentVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Tournament, ApiError | AxiosError, PutTournamentVariables>(
    ({ id, ...body }: PutTournamentVariables) => putTournament(api, id, body),
    {
      onSuccess(tournament: Tournament) {
        queryClient.setQueryData(['tournaments', tournament.id], tournament);
      },
      ...options,
    },
  );
}

export interface AttachTournamentMatchBody extends RequestBody {
  match: string;
}

export async function attachTournamentMatch(
  api: ApiContext,
  id: string,
  body: AttachTournamentMatchBody,
): Promise<Tournament> {
  const { data } = await api.put<Tournament>(`/tournaments/${id}/attach_match`, body);
  return data;
}

export type AttachTournamentMatchVariables = AttachTournamentMatchBody & { id: string };

export function useAttachTournamentMatch(
  options?: Omit<
    UseMutationOptions<Tournament, ApiError | AxiosError, AttachTournamentMatchVariables>,
    'mutationFn'
  >,
): UseMutationResult<Tournament, ApiError | AxiosError, AttachTournamentMatchVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Tournament, ApiError | AxiosError, AttachTournamentMatchVariables>(
    ({ id, ...body }: AttachTournamentMatchVariables) => attachTournamentMatch(api, id, body),
    {
      onSuccess(tournament: Tournament) {
        queryClient.setQueryData(['tournaments', tournament.id], tournament);
      },
      ...options,
    },
  );
}
