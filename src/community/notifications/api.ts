import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { Notification } from './model';
import {
  ApiContext,
  ApiError,
  ListRequestQuery,
  PaginatedList,
  RequestBody,
  RequestQuery,
  useApi,
} from '../../api';
import { Wallet } from '../../market';

export type GetNotificationQuery = RequestQuery;

export async function getNotification(
  api: ApiContext,
  id: string,
  query?: GetNotificationQuery,
): Promise<Notification> {
  const { data } = await api.get<Notification, RequestQuery>(`/notifications/${id}`, query);
  return data;
}

export function useNotification(
  id?: string,
  query?: GetNotificationQuery,
  options?: Omit<UseQueryOptions<Notification, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Notification, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Notification, ApiError | AxiosError>(
    ['notifications', id],
    () => getNotification(api, id as string, query),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options?.enabled && !!id : !!id,
    },
  );
}

export interface NotificationList extends PaginatedList<'notifications', Notification> {
  total_unseen?: number;
  total_unread?: number;
}

export interface GetNotificationsQuery extends ListRequestQuery {
  wallet?: Wallet | string;
  is_seen?: boolean;
  is_read?: boolean;
}

export async function getNotifications(
  api: ApiContext,
  query?: GetNotificationsQuery,
): Promise<NotificationList> {
  const { data } = await api.get<NotificationList>('/notifications', query);
  return data;
}

export interface UseNotificationsOptions
  extends Omit<UseQueryOptions<NotificationList, ApiError | AxiosError>, 'queryFn' | 'queryKey'> {
  onCreated?: (notification: Notification) => unknown;
  onUpdated?: (notification: Notification) => unknown;
}

export function useNotifications(
  query?: GetNotificationsQuery,
  options?: UseNotificationsOptions,
): UseQueryResult<NotificationList, ApiError | AxiosError> {
  const api = useApi();
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = api.openSocket('/notifications', ['notifications', query], {
      query,
    });

    socket.on('connect_error', (error) => {
      console.error(error);
    });

    socket.on('created', async (notification: Notification) => {
      if (options?.onCreated) {
        options.onCreated(notification);
      }
      await queryClient.refetchQueries(['notifications', query]);
    });

    socket.on('updated', async (notification: Notification) => {
      if (options?.onUpdated) {
        options.onUpdated(notification);
      }
      await queryClient.refetchQueries(['notifications', query]);
    });

    return () => {
      socket.off('connect_error');
      socket.off('created');
      socket.off('updated');
    };
  }, [api, options, query, queryClient]);

  return useQuery<NotificationList, ApiError | AxiosError>(
    ['notifications', query],
    () => getNotifications(api, query),
    {
      staleTime: Infinity,
      ...options,
    },
  );
}

export interface NotificationBody extends RequestBody {
  is_seen?: boolean | string;
  is_read?: boolean | string;
}

export async function putNotification(
  api: ApiContext,
  id: string,
  body: NotificationBody,
): Promise<Notification> {
  const { data } = await api.put<Notification, NotificationBody>(`/notifications/${id}`, body);
  return data;
}

export type PutNotificationVariables = NotificationBody & { id: string };

export function usePutNotification(
  options?: Omit<
    UseMutationOptions<Notification, ApiError | AxiosError, NotificationBody>,
    'mutationFn'
  >,
): UseMutationResult<Notification, ApiError | AxiosError, PutNotificationVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Notification, ApiError | AxiosError, PutNotificationVariables>(
    ({ id, ...body }: PutNotificationVariables) => putNotification(api, id, body),
    {
      onSuccess(notification: Notification) {
        queryClient.setQueryData(['notifications', notification.id], notification);
      },
      ...options,
    },
  );
}

export async function seeAllNotifications(
  api: ApiContext,
  query?: GetNotificationsQuery,
): Promise<NotificationList> {
  const { data } = await api.put<NotificationList>('/notifications/all/see', undefined, query);
  return data;
}

export function useSeeAllNotifications(
  query?: GetNotificationsQuery,
  options?: Omit<UseMutationOptions<NotificationList, ApiError | AxiosError>, 'mutationFn'>,
): UseMutationResult<NotificationList, ApiError | AxiosError, void> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<NotificationList, ApiError | AxiosError, void>(
    () => seeAllNotifications(api),
    {
      onSuccess(notifications) {
        queryClient.setQueryData(['notifications', query], notifications);
      },
      ...options,
    },
  );
}
