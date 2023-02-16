import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import UserEvent from './model';
import { PaginatedList, RequestQuery, useApi } from '../../api';

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
    const { data } = await api.get<UserEventList, UserEventsQuery>('/user_events', query);
    return data;
  });
}

export function useDoesUserEventExists(query?: UserEventsQuery): UseQueryResult<boolean> {
  const api = useApi();
  return useQuery<boolean>(['user_events', 'any', 'exists', query], async () => {
    const { data } = await api.get<boolean>('/user_events/any/exists', query);
    return data;
  });
}

export interface UserEventBody {
  user?: string | null;
  code?: string | null;
}

export function usePostUserEvent(
  initialBody?: UserEventBody,
): UseMutationResult<UserEvent, unknown, UserEventBody | undefined> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<UserEvent, unknown, UserEventBody | undefined>(
    async (body?: UserEventBody) => {
      const { data } = await api.post<UserEvent>('/user_events', { ...initialBody, ...body });
      return data;
    },
    {
      onSuccess: (userEvent: UserEvent) => {
        const query = {
          code: userEvent.code,
          user: typeof userEvent.user === 'object' ? userEvent.user.id : userEvent.user,
        };
        queryClient.setQueryData(['user_events', query], userEvent);
        queryClient.setQueryData(['user_events', 'any', 'exists', query], true);
      },
    },
  );
}
