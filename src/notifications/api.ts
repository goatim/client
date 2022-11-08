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

export interface UseNotificationsOptions {
  onCreated: (notification: Notification) => unknown;
  onUpdated: (notification: Notification) => unknown;
}

export function useNotifications(
  query?: GetNotificationsQuery,
  options?: UseNotificationsOptions,
): UseQueryResult<NotificationList> {
  const api = useApi();
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = api.createSocket('/notifications', {
      query,
    });

    socket.on('connect_error', (error) => {
      console.error(error);
    });

    socket.on('created', async (notification: Notification) => {
      if (options?.onCreated) {
        options.onCreated(notification);
      }
      await queryClient.invalidateQueries(['notifications', query]);
    });

    socket.on('updated', async (notification: Notification) => {
      if (options?.onUpdated) {
        options.onUpdated(notification);
      }
      await queryClient.invalidateQueries(['notifications', query]);
    });

    return () => {
      socket.close();
    };
  }, [api, options, query, queryClient]);

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

export interface NotificationBody {
  is_seen?: boolean | string;
  is_read?: boolean | string;
}

export type PutNotificationVariables = NotificationBody & { id: string };

export function usePutNotification(): UseMutationResult<
  Notification,
  unknown,
  PutNotificationVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Notification, unknown, PutNotificationVariables>(
    async ({ id, ...body }: PutNotificationVariables) => {
      const { data } = await api.put<Notification, NotificationBody>(`/notifications/${id}`, body);
      return data;
    },
    {
      onSuccess(notification: Notification) {
        queryClient.setQueryData(['users', notification.id], notification);
      },
    },
  );
}

export function useSeeAllNotifications(
  query?: GetNotificationsQuery,
): UseMutationResult<NotificationList, unknown, void> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<NotificationList>(
    async () => {
      const { data } = await api.put<NotificationList>('/notifications/all/see');
      return data;
    },
    {
      onSuccess(notifications) {
        queryClient.setQueryData(['notifications', query], notifications);
      },
    },
  );
}
