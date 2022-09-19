import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { PaginatedList, RequestBody, RequestQuery, useApi } from '../../api';
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

export type GetLeaguesQuery = RequestQuery;

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

export function useCreateLeague(): UseMutationResult<League, unknown, LeagueBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<League, unknown, LeagueBody>(
    async (body: LeagueBody) => {
      const { data } = await api.post<League>('/leagues', body);
      return data;
    },
    {
      onSuccess(league: League) {
        queryClient.setQueryData(['leagues', league.id], league);
      },
    },
  );
}

export type UpdateLeagueVariables = LeagueBody & { id: string };

export function useUpdateLeague(): UseMutationResult<League, unknown, UpdateLeagueVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<League, unknown, UpdateLeagueVariables>(
    async ({ id, ...body }: UpdateLeagueVariables) => {
      const { data } = await api.put<League>(`/leagues/${id}`, body);
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
