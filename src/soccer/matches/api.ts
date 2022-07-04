import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { PaginatedList, RequestBody, RequestParams, useApi } from '../../api';
import Match from './model';

export function useMatch(id?: string): UseQueryResult<Match> {
  const api = useApi();
  return useQuery(['matches', id], async () => {
    const { data } = await api.get<Match>(`/matches/${id}`);
    return data;
  });
}

export type MatchList = PaginatedList<'matches', Match>;

export interface GetMatchesParams extends RequestParams {
  spotlight?: boolean;
}

export function useMatches(params?: GetMatchesParams): UseQueryResult<MatchList> {
  const api = useApi();
  return useQuery(['matches', params], async () => {
    const { data } = await api.get('/matches', params);
    return data;
  });
}

export function useSpotlightMatches(): UseQueryResult<MatchList> {
  return useMatches({ spotlight: true });
}

export interface MatchBody extends RequestBody {
  title?: string | null;
  description?: string | null;
  beginning?: string | null;
  end?: string | null;
  is_public?: boolean;
  status?: string | null;
}

export function useCreateMatch(): UseMutationResult<Match, unknown, MatchBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Match, unknown, MatchBody>(
    async (body: MatchBody) => {
      const { data } = await api.post<Match>('/matches', body);
      return data;
    },
    {
      onSuccess(match: Match) {
        queryClient.setQueryData(['matches', match.id], match);
      },
    },
  );
}

export type UpdateMatchVariables = MatchBody & { id: string };

export function useUpdateMatch(): UseMutationResult<Match, unknown, UpdateMatchVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Match, unknown, UpdateMatchVariables>(
    async ({ id, ...body }: UpdateMatchVariables) => {
      const { data } = await api.put<Match>(`/matches/${body}`, body);
      return data;
    },
    {
      onSuccess(match: Match) {
        queryClient.setQueryData(['matches', match.id], match);
      },
    },
  );
}

export type AddMatchPictureBody = { icon: File };

export type AddMatchPictureVariables = AddMatchPictureBody & { id: string };

export function useAddMatchIcon(): UseMutationResult<Match, unknown, AddMatchPictureVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Match, unknown, AddMatchPictureVariables>(
    async ({ id, icon }: AddMatchPictureVariables) => {
      const { data } = await api.post<Match>(`/matches/${id}/icon`, { icon });
      return data;
    },
    {
      onSuccess(match: Match) {
        queryClient.setQueryData(['matches', match.id], match);
      },
    },
  );
}
