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
import { TournamentParticipant } from './model';

export async function getTournamentParticipant(
  api: ApiContext,
  id: string,
): Promise<TournamentParticipant> {
  const { data } = await api.get<TournamentParticipant>(`/tournament_participants/${id}`);
  return data;
}

export function useTournamentParticipant(
  id?: string,
  options?: Omit<
    UseQueryOptions<TournamentParticipant, ApiError | AxiosError>,
    'queryFn' | 'queryKey'
  >,
): UseQueryResult<TournamentParticipant, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<TournamentParticipant, ApiError | AxiosError>(
    ['tournament_participants', id],
    () => getTournamentParticipant(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type TournamentParticipantList = PaginatedList<
  'tournament_participants',
  TournamentParticipant
>;

export interface GetTournamentParticipantsQuery extends ListRequestQuery {
  tournament?: string;
}

export async function getTournamentParticipants(
  api: ApiContext,
  query?: GetTournamentParticipantsQuery,
): Promise<TournamentParticipantList> {
  const { data } = await api.get<TournamentParticipantList, GetTournamentParticipantsQuery>(
    '/tournament_participants',
    query,
  );
  return data;
}

export function useTournamentParticipants(
  query?: GetTournamentParticipantsQuery,
  options?: Omit<
    UseQueryOptions<TournamentParticipantList, ApiError | AxiosError>,
    'queryFn' | 'queryKey'
  >,
): UseQueryResult<TournamentParticipantList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<TournamentParticipantList, ApiError | AxiosError>(
    ['tournament_participants', query],
    () => getTournamentParticipants(api, query),
    options,
  );
}

export interface TournamentParticipantBody extends RequestBody {
  tournament?: string | null;
  wallet?: string | null;
}

export async function postTournamentParticipant(
  api: ApiContext,
  body: TournamentParticipantBody,
): Promise<TournamentParticipant> {
  const { data } = await api.post<TournamentParticipant, TournamentParticipantBody>(
    '/tournament_participants',
    body,
  );
  return data;
}

export function usePostTournamentParticipant(
  options?: Omit<
    UseMutationOptions<TournamentParticipant, ApiError | AxiosError, TournamentParticipantBody>,
    'mutationFn'
  >,
): UseMutationResult<TournamentParticipant, ApiError | AxiosError, TournamentParticipantBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<TournamentParticipant, ApiError | AxiosError, TournamentParticipantBody>(
    (body: TournamentParticipantBody) => postTournamentParticipant(api, body),
    {
      onSuccess(tournamentParticipant: TournamentParticipant) {
        queryClient.setQueryData(
          ['tournament_participants', tournamentParticipant.id],
          tournamentParticipant,
        );
      },
      ...options,
    },
  );
}

export async function putTournamentParticipant(
  api: ApiContext,
  id: string,
  body: TournamentParticipantBody,
): Promise<TournamentParticipant> {
  const { data } = await api.put<TournamentParticipant, TournamentParticipantBody>(
    `/tournament_participants/${id}`,
    body,
  );
  return data;
}

export type PutTournamentParticipantVariables = TournamentParticipantBody & { id: string };

export function usePutTournamentParticipant(
  options?: Omit<
    UseMutationOptions<
      TournamentParticipant,
      ApiError | AxiosError,
      PutTournamentParticipantVariables
    >,
    'mutationFn'
  >,
): UseMutationResult<
  TournamentParticipant,
  ApiError | AxiosError,
  PutTournamentParticipantVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<
    TournamentParticipant,
    ApiError | AxiosError,
    PutTournamentParticipantVariables
  >(
    ({ id, ...body }: PutTournamentParticipantVariables) => putTournamentParticipant(api, id, body),
    {
      onSuccess(tournamentParticipant: TournamentParticipant) {
        queryClient.setQueryData(
          ['tournament_participants', tournamentParticipant.id],
          tournamentParticipant,
        );
      },
      ...options,
    },
  );
}
