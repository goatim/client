import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { ListRequestQuery, PaginatedList, useApi } from '../../api';
import Match from './model';

export function useMatch(id?: string): UseQueryResult<Match> {
  const api = useApi();
  return useQuery(['matches', id], async () => {
    const { data } = await api.get<Match>(`/matches/${id}`);
    return data;
  });
}

export type MatchList = PaginatedList<'matches', Match>;

export interface GetMatchesQuery extends ListRequestQuery {
  spotlight?: boolean;
}

export function useMatches(
  query?: GetMatchesQuery,
  options?: UseQueryOptions<MatchList>,
): UseQueryResult<MatchList> {
  const api = useApi();
  return useQuery<MatchList>(
    ['matches', query],
    async () => {
      const { data } = await api.get<MatchList>('/matches', query);
      return data;
    },
    options,
  );
}

export function useSpotlightMatches(): UseQueryResult<MatchList> {
  return useMatches({ spotlight: true });
}

export interface MatchBody {
  title?: string | null;
  description?: string | null;
  beginning?: string | null;
  end?: string | null;
  is_public?: boolean;
  status?: string | null;
}

export function usePostMatch(): UseMutationResult<Match, unknown, MatchBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Match, unknown, MatchBody>(
    async (body: MatchBody) => {
      const { data } = await api.post<Match, MatchBody>('/matches', body);
      return data;
    },
    {
      onSuccess(match: Match) {
        queryClient.setQueryData(['matches', match.id], match);
      },
    },
  );
}

export type PutMatchVariables = MatchBody & { id: string };

export function usePutMatch(): UseMutationResult<Match, unknown, PutMatchVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Match, unknown, PutMatchVariables>(
    async ({ id, ...body }: PutMatchVariables) => {
      const { data } = await api.put<Match, MatchBody>(`/matches/${id}`, body);
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
