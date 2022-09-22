import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import UserEvent from './model';
import { PaginatedList, RequestBody, RequestQuery, useApi } from '../../api';

export function useUserEvent(id?: string): UseQueryResult<UserEvent> {
  const api = useApi();
  return useQuery<UserEvent>(
    ['user_events', id],
    async () => {
      const { data } = await api.get<UserEvent>(`/user_events/${id}`);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export interface UserEventsQuery extends RequestQuery {
  user?: string;
  code?: string;
}

export type UserEventList = PaginatedList<'user_events', UserEvent>;

export function useUserEvents(query?: UserEventsQuery): UseQueryResult<UserEventList> {
  const api = useApi();
  return useQuery<UserEventList>(['user_events', query], async () => {
    const { data } = await api.get<UserEventList>('/user_events', query);
    return data;
  });
}

export function useDoesUserEventExists(query?: UserEventsQuery): UseQueryResult<boolean> {
  const api = useApi();
  return useQuery<boolean>(['user_events', 'exists', query], async () => {
    const { data } = await api.get<boolean>('/user_events/any/exists', query);
    return data;
  });
}

export interface UserEventBody extends RequestBody {
  user?: string | null;
  code?: string | null;
}

export function usePostUserEvent(
  initialBody?: UserEventBody,
): UseMutationResult<UserEvent, unknown, UserEventBody | undefined> {
  const api = useApi();
  return useMutation<UserEvent, unknown, UserEventBody | undefined>(
    async (body?: UserEventBody) => {
      const { data } = await api.post<UserEvent>('/user_events', { ...initialBody, ...body });
      return data;
    },
  );
}
