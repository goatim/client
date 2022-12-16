import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { ListRequestQuery, PaginatedList, RequestBody, useApi } from '../../api';
import League from './model';

export function useLeague(id?: string): UseQueryResult<League> {
  const api = useApi();
  return useQuery<League>(
    ['leagues', id],
    async () => {
      const { data } = await api.get<League>(`/leagues/${id}`);
      return data;
    },
    { enabled: !!id },
  );
}

export type LeagueList = PaginatedList<'leagues', League>;

export interface GetLeaguesQuery extends ListRequestQuery {
  name?: string;
  slug?: string;
  id?: string;
}

export function useLeagues(query?: GetLeaguesQuery): UseQueryResult<LeagueList> {
  const api = useApi();
  return useQuery<LeagueList>(['leagues', query], async () => {
    const { data } = await api.get<LeagueList>('/leagues', query);
    return data;
  });
}

export interface LeagueBody extends RequestBody {
  name?: string | null;
  description?: string | null;
}

export function usePostLeague(): UseMutationResult<League, unknown, LeagueBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<League, unknown, LeagueBody>(
    async (body: LeagueBody) => {
      const { data } = await api.post<League, LeagueBody>('/leagues', body);
      return data;
    },
    {
      onSuccess(league: League) {
        queryClient.setQueryData(['leagues', league.id], league);
      },
    },
  );
}

export type PutLeagueVariables = LeagueBody & { id: string };

export function usePutLeague(): UseMutationResult<League, unknown, PutLeagueVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<League, unknown, PutLeagueVariables>(
    async ({ id, ...body }: PutLeagueVariables) => {
      const { data } = await api.put<League, LeagueBody>(`/leagues/${id}`, body);
      return data;
    },
    {
      onSuccess(league: League) {
        queryClient.setQueryData(['leagues', league.id], league);
      },
    },
  );
}

export type AddLeaguePictureBody = { icon: File };

export type AddLeaguePictureVariables = AddLeaguePictureBody & { id: string };

export function useAddLeagueIcon(): UseMutationResult<League, unknown, AddLeaguePictureVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<League, unknown, AddLeaguePictureVariables>(
    async ({ id, icon }: AddLeaguePictureVariables) => {
      const { data } = await api.post<League>(`/leagues/${id}/icon`, { icon });
      return data;
    },
    {
      onSuccess(league: League) {
        queryClient.setQueryData(['leagues', league.id], league);
      },
    },
  );
}
