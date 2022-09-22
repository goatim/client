import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { PaginatedList, RequestBody, RequestQuery, useApi } from '../../api';
import Club from './model';

export function useClub(
  clubId?: string,
  query?: RequestQuery,
  initialData?: Club,
): UseQueryResult<Club> {
  const api = useApi();
  return useQuery<Club>(
    ['clubs', clubId],
    async () => {
      const { data } = await api.get<Club>(`/clubs/${clubId}`, query);
      return data;
    },
    { enabled: !!clubId, initialData },
  );
}

export type ClubList = PaginatedList<'clubs', Club>;

export interface GetClubsQuery extends RequestQuery {
  league?: string;
}

export function useClubs(query?: GetClubsQuery): UseQueryResult<ClubList> {
  const api = useApi();
  return useQuery<ClubList>(['clubs', query], async () => {
    const { data } = await api.get<ClubList>('/clubs', query);
    return data;
  });
}

export interface ClubBody extends RequestBody {
  name?: string | null;
  short_name?: string | null;
  description?: string | null;
  league?: string | null;
}

export function usePostClub(): UseMutationResult<Club, unknown, ClubBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Club, unknown, ClubBody>(
    async (body: ClubBody) => {
      const { data } = await api.post<Club>('/clubs', body);
      return data;
    },
    {
      onSuccess(club: Club) {
        queryClient.setQueryData(['clubs', club.id], club);
      },
    },
  );
}

export type PutClubVariables = ClubBody & { id: string };

export function usePutClub(): UseMutationResult<Club, unknown, PutClubVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Club, unknown, PutClubVariables>(
    async ({ id, ...body }: PutClubVariables) => {
      const { data } = await api.put<Club>(`/clubs/${id}`, body);
      return data;
    },
    {
      onSuccess(club: Club) {
        queryClient.setQueryData(['clubs', club.id], club);
      },
    },
  );
}

export type AddClubPictureBody = { icon: File };

export type AddClubPictureVariables = AddClubPictureBody & { id: string };

export function useAddClubIcon(): UseMutationResult<Club, unknown, AddClubPictureVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Club, unknown, AddClubPictureVariables>(
    async ({ id, icon }: AddClubPictureVariables) => {
      const { data } = await api.post<Club>(`/clubs/${id}/icon`, { icon });
      return data;
    },
    {
      onSuccess(club: Club) {
        queryClient.setQueryData(['clubs', club.id], club);
      },
    },
  );
}
