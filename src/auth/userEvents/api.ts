import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserEvent } from './model';
import { ApiContext, ApiError, PaginatedList, RequestQuery, useApi } from '../../api';

export async function getUserEvent(api: ApiContext, id: string): Promise<UserEvent> {
  const { data } = await api.get<UserEvent>(`/user_events/${id}`);
  return data;
}

export function useUserEvent(
  id?: string,
  options?: Omit<UseQueryOptions<UserEvent, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<UserEvent, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<UserEvent, ApiError | AxiosError>(
    ['user_events', id],
    () => getUserEvent(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options?.enabled && !!id : !!id,
    },
  );
}

export interface GetUserEventsQuery extends RequestQuery {
  user?: string;
  code?: string;
}

export type UserEventList = PaginatedList<'user_events', UserEvent>;

export async function getUserEvents(
  api: ApiContext,
  query?: GetUserEventsQuery,
): Promise<UserEventList> {
  const { data } = await api.get<UserEventList, GetUserEventsQuery>('/user_events', query);
  return data;
}

export function useUserEvents(
  query?: GetUserEventsQuery,
  options?: Omit<UseQueryOptions<UserEventList, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<UserEventList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<UserEventList, ApiError | AxiosError>(
    ['user_events', query],
    () => getUserEvents(api, query),
    options,
  );
}

export async function doesUserEventExists(
  api: ApiContext,
  query?: GetUserEventsQuery,
): Promise<boolean> {
  const { data } = await api.get<boolean>('/user_events/any/exists', query);
  return data;
}

export function useDoesUserEventExists(
  query?: GetUserEventsQuery,
  options?: Omit<UseQueryOptions<boolean, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<boolean, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<boolean, ApiError | AxiosError>(
    ['user_events', 'any', 'exists', query],
    () => doesUserEventExists(api, query),
    options,
  );
}

export interface UserEventBody {
  user?: string | null;
  code: string | null;
}

export async function postUserEvent(api: ApiContext, body: UserEventBody): Promise<UserEvent> {
  const { data } = await api.post<UserEvent, UserEventBody>('/user_events', body);
  return data;
}

export function usePostUserEvent(
  options?: Omit<UseMutationOptions<UserEvent, ApiError | AxiosError, UserEventBody>, 'mutationFn'>,
): UseMutationResult<UserEvent, ApiError | AxiosError, UserEventBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<UserEvent, ApiError | AxiosError, UserEventBody>(
    (body: UserEventBody) => postUserEvent(api, body),
    {
      onSuccess: (userEvent: UserEvent) => {
        const query = {
          code: userEvent.code,
          user: typeof userEvent.user === 'object' ? userEvent.user.id : userEvent.user,
        };
        queryClient.setQueryData(['user_events', query], userEvent);
        queryClient.setQueryData(['user_events', 'any', 'exists', query], true);
      },
      ...options,
    },
  );
}
