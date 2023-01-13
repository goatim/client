import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { ListRequestQuery, PaginatedList, RequestBody, useApi } from '../../api';
import TournamentParticipant from './model';

export function useTournamentParticipant(id?: string): UseQueryResult<TournamentParticipant> {
  const api = useApi();
  return useQuery<TournamentParticipant>(
    ['tournament_participants', id],
    async () => {
      const { data } = await api.get<TournamentParticipant>(`/tournament_participants/${id}`);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export type TournamentParticipantList = PaginatedList<
  'tournament_participants',
  TournamentParticipant
>;

export type GetTournamentParticipantsQuery = ListRequestQuery;

export function useTournamentParticipants(
  query?: GetTournamentParticipantsQuery,
): UseQueryResult<TournamentParticipantList> {
  const api = useApi();
  return useQuery<TournamentParticipantList>(['tournament_participants', query], async () => {
    const { data } = await api.get<TournamentParticipantList, GetTournamentParticipantsQuery>(
      '/tournament_participants',
      query,
    );
    return data;
  });
}

export interface TournamentParticipantBody extends RequestBody {
  tournament?: string | null;
  wallet?: string | null;
}

export function usePostTournamentParticipant(): UseMutationResult<
  TournamentParticipant,
  unknown,
  TournamentParticipantBody
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<TournamentParticipant, unknown, TournamentParticipantBody>(
    async (body: TournamentParticipantBody) => {
      const { data } = await api.post<TournamentParticipant, TournamentParticipantBody>(
        '/tournament_participants',
        body,
      );
      return data;
    },
    {
      onSuccess(tournamentParticipant: TournamentParticipant) {
        queryClient.setQueryData(
          ['tournament_participants', tournamentParticipant.id],
          tournamentParticipant,
        );
      },
    },
  );
}

export type PutTournamentParticipantVariables = TournamentParticipantBody & { id: string };

export function usePutTournamentParticipant(): UseMutationResult<
  TournamentParticipant,
  unknown,
  PutTournamentParticipantVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<TournamentParticipant, unknown, PutTournamentParticipantVariables>(
    async ({ id, ...body }: PutTournamentParticipantVariables) => {
      const { data } = await api.put<TournamentParticipant, TournamentParticipantBody>(
        `/tournament_participants/${id}`,
        body,
      );
      return data;
    },
    {
      onSuccess(tournamentParticipant: TournamentParticipant) {
        queryClient.setQueryData(
          ['tournament_participants', tournamentParticipant.id],
          tournamentParticipant,
        );
      },
    },
  );
}
