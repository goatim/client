import { PaginatedList, RequestBody, RequestParams, useApi } from '@cezembre/fronts';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
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

export interface UseLeaguesParams extends RequestParams {
  expand?: string;
}

export function useLeagues(params?: UseLeaguesParams): UseQueryResult<LeagueList> {
  const api = useApi();
  return useQuery<LeagueList>(['leagues', params], async () => {
    const { data } = await api.get<LeagueList>('/leagues', params);
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
      const { data } = await api.put<League>(`/leagues/${body}`, body);
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
