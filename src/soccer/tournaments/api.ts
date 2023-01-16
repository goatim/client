import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { ListRequestQuery, PaginatedList, RequestBody, useApi } from '../../api';
import Tournament from './model';

export function useTournament(id?: string): UseQueryResult<Tournament> {
  const api = useApi();
  return useQuery<Tournament>(
    ['tournaments', id],
    async () => {
      const { data } = await api.get<Tournament>(`/tournaments/${id}`);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export type TournamentList = PaginatedList<'tournaments', Tournament>;

export type GetTournamentsQuery = ListRequestQuery;

export function useTournaments(query?: GetTournamentsQuery): UseQueryResult<TournamentList> {
  const api = useApi();
  return useQuery<TournamentList>(['tournaments', query], async () => {
    const { data } = await api.get<TournamentList, GetTournamentsQuery>('/tournaments', query);
    return data;
  });
}

export interface TournamentBody extends RequestBody {
  title?: string | null;
  description?: string | null;
}

export function usePostTournament(): UseMutationResult<Tournament, unknown, TournamentBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Tournament, unknown, TournamentBody>(
    async (body: TournamentBody) => {
      const { data } = await api.post<Tournament, TournamentBody>('/tournaments', body);
      return data;
    },
    {
      onSuccess(tournament: Tournament) {
        queryClient.setQueryData(['tournaments', tournament.id], tournament);
      },
    },
  );
}

export type PutTournamentVariables = TournamentBody & { id: string };

export function usePutTournament(): UseMutationResult<Tournament, unknown, PutTournamentVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Tournament, unknown, PutTournamentVariables>(
    async ({ id, ...body }: PutTournamentVariables) => {
      const { data } = await api.put<Tournament, TournamentBody>(`/tournaments/${id}`, body);
      return data;
    },
    {
      onSuccess(tournament: Tournament) {
        queryClient.setQueryData(['tournaments', tournament.id], tournament);
      },
    },
  );
}

export interface AttachTournamentMatchBody extends RequestBody {
  match: string;
}

export type AttachTournamentMatchVariables = AttachTournamentMatchBody & { id: string };

export function useAttachTournamentMatch(): UseMutationResult<
  Tournament,
  unknown,
  AttachTournamentMatchVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Tournament, unknown, AttachTournamentMatchVariables>(
    async ({ id, match }: AttachTournamentMatchVariables) => {
      const { data } = await api.put<Tournament>(`/tournaments/${id}/attach_match`, {
        match,
      });
      return data;
    },
    {
      onSuccess(tournament: Tournament) {
        queryClient.setQueryData(['tournaments', tournament.id], tournament);
      },
    },
  );
}
