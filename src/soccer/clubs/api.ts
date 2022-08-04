import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { PaginatedList, RequestBody, RequestParams, useApi } from '../../api';
import Club from './model';

export function useClub(
  clubId?: string,
  params?: RequestParams,
  initialData?: Club,
): UseQueryResult<Club> {
  const api = useApi();
  return useQuery<Club>(
    ['clubs', clubId],
    async () => {
      const { data } = await api.get<Club>(`/clubs/${clubId}`, params);
      return data;
    },
    { enabled: !!clubId, initialData },
  );
}

export type ClubList = PaginatedList<'clubs', Club>;

export interface GetClubsParams extends RequestParams {
  league?: string;
}

export function useClubs(params?: GetClubsParams): UseQueryResult<ClubList> {
  const api = useApi();
  return useQuery<ClubList>(['clubs', params], async () => {
    const { data } = await api.get<ClubList>('/clubs', params);
    return data;
  });
}

export interface ClubBody extends RequestBody {
  name?: string | null;
  short_name?: string | null;
  description?: string | null;
  league?: string | null;
}

export function useCreateClub(): UseMutationResult<Club, unknown, ClubBody> {
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

export type UpdateClubVariables = ClubBody & { id: string };

export function useUpdateClub(): UseMutationResult<Club, unknown, UpdateClubVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Club, unknown, UpdateClubVariables>(
    async ({ id, ...body }: UpdateClubVariables) => {
      const { data } = await api.put<Club>(`/clubs/${body}`, body);
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
