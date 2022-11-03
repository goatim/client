import { useQuery, UseQueryResult } from 'react-query';
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
  return useQuery<NotificationList>(['notifications', query], async () => {
    const { data } = await api.get<NotificationList>('/notifications', query);
    return data;
  });
}
