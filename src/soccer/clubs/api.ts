import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { AxiosError } from 'axios';
import {
  ApiContext,
  ApiError,
  ListRequestQuery,
  PaginatedList,
  RequestBody,
  RequestQuery,
  useApi,
} from '../../api';
import { Club } from './model';

export type GetClubQuery = RequestQuery;

export async function getClub(api: ApiContext, id: string, query?: GetClubQuery): Promise<Club> {
  const { data } = await api.get<Club>(`/clubs/${id}`, query);
  return data;
}

export function useClub(
  id?: string,
  query?: RequestQuery,
  options?: Omit<UseQueryOptions<Club, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<Club, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Club, ApiError | AxiosError>(
    ['clubs', id],
    () => getClub(api, id as string, query),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type ClubList = PaginatedList<'clubs', Club>;

export interface GetClubsQuery extends ListRequestQuery {
  league?: string;
}

export async function getClubs(api: ApiContext, query?: GetClubsQuery): Promise<ClubList> {
  const { data } = await api.get<ClubList>('/clubs', query);
  return data;
}

export function useClubs(
  query?: GetClubsQuery,
  options?: Omit<UseQueryOptions<ClubList, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<ClubList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<ClubList, ApiError | AxiosError>(
    ['clubs', query],
    () => getClubs(api, query),
    options,
  );
}

export interface ClubBody extends RequestBody {
  name?: string | null;
  short_name?: string | null;
  description?: string | null;
  league?: string | null;
}

export async function postClub(api: ApiContext, body: ClubBody): Promise<Club> {
  const { data } = await api.post<Club, ClubBody>('/clubs', body);
  return data;
}

export function usePostClub(
  options?: Omit<UseMutationOptions<Club, ApiError | AxiosError, ClubBody>, 'mutationFn'>,
): UseMutationResult<Club, ApiError | AxiosError, ClubBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Club, ApiError | AxiosError, ClubBody>(
    (body: ClubBody) => postClub(api, body),
    {
      onSuccess(club: Club) {
        queryClient.setQueryData(['clubs', club.id], club);
      },
      ...options,
    },
  );
}

export async function putClub(api: ApiContext, id: string, body: ClubBody): Promise<Club> {
  const { data } = await api.put<Club, ClubBody>(`/clubs/${id}`, body);
  return data;
}

export type PutClubVariables = ClubBody & { id: string };

export function usePutClub(
  options?: Omit<UseMutationOptions<Club, ApiError | AxiosError, ClubBody>, 'mutationFn'>,
): UseMutationResult<Club, ApiError | AxiosError, PutClubVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Club, ApiError | AxiosError, PutClubVariables>(
    ({ id, ...body }: PutClubVariables) => putClub(api, id, body),
    {
      onSuccess(club: Club) {
        queryClient.setQueryData(['clubs', club.id], club);
      },
      ...options,
    },
  );
}

export interface PostClubIconBody extends RequestBody {
  icon: File;
}

export async function postClubIcon(
  api: ApiContext,
  id: string,
  body: PostClubIconBody,
): Promise<Club> {
  const { data } = await api.post<Club>(`/clubs/${id}/icon`, body);
  return data;
}

export type PostClubIconVariables = PostClubIconBody & { id: string };

export function usePostClubIcon(
  options?: Omit<UseMutationOptions<Club, ApiError | AxiosError, ClubBody>, 'mutationFn'>,
): UseMutationResult<Club, ApiError | AxiosError, PostClubIconVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Club, ApiError | AxiosError, PostClubIconVariables>(
    async ({ id, ...body }: PostClubIconVariables) => postClubIcon(api, id, body),
    {
      onSuccess(club: Club) {
        queryClient.setQueryData(['clubs', club.id], club);
      },
      ...options,
    },
  );
}
