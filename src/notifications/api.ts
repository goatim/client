import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useEffect } from 'react';
import Notification from './model';
import { ListRequestQuery, PaginatedList, RequestQuery, useApi } from '../api';

export type GetNotificationQuery = RequestQuery;

export function useNotification(
  id?: string,
  query?: GetNotificationQuery,
): UseQueryResult<Notification> {
  const api = useApi();
  return useQuery<Notification>(
    ['notifications', id],
    async () => {
      const { data } = await api.get<Notification, RequestQuery>(`/notifications/${id}`, query);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export interface NotificationList extends PaginatedList<'notifications', Notification> {
  total_unseen?: number;
  total_unread?: number;
}

export interface GetNotificationsQuery extends ListRequestQuery {
  is_seen?: boolean;
  is_read?: boolean;
}

export function useNotifications(
  query?: GetNotificationsQuery,
): UseQueryResult<NotificationList> | undefined {
  const api = useApi();
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = api.createSocket('/notifications', {
      query,
    });

    socket.on('connect_error', (error) => {
      console.error(error);
    });

    socket.on('create', async () => {
      await queryClient.invalidateQueries(['notifications', query]);
    });

    return () => {
      socket.close();
    };
  }, [api, query, queryClient]);

  return useQuery<NotificationList>(
    ['notifications', query],
    async () => {
      const { data } = await api.get<NotificationList>('/notifications', query);
      return data;
    },
    {
      staleTime: Infinity,
    },
  );
}

export function useSeeNotification(): UseMutationResult<Notification, unknown, string> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Notification, unknown, string>(
    async (id: string) => {
      const { data } = await api.put<Notification>(`/notifications/${id}`);
      return data;
    },
    {
      onSuccess() {
        queryClient.setQueryData(['notifications'], 4);
      },
    },
  );
}
