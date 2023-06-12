import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import { AxiosError } from 'axios';
import { Session } from './model';
import { ApiContext, ApiError, RequestQuery, useApi } from '../../api';

export interface GetSessionQuery extends RequestQuery {
  auto_refresh?: boolean;
}

export async function getSession(
  api: ApiContext,
  id: string,
  query?: GetSessionQuery,
): Promise<Session> {
  const { data } = await api.get<Session, GetSessionQuery>(`/sessions/${id}`, query);
  return data;
}

export function useSession(
  id?: string,
  query?: GetSessionQuery,
  options?: Omit<UseQueryOptions<Session, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<Session, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Session, ApiError | AxiosError>(
    ['sessions', id],
    () => getSession(api, id as string, query),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options?.enabled && !!id : !!id,
    },
  );
}

export function useActiveSession(): UseQueryResult<Session> {
  const api = useApi();
  const session = useSession(
    'active',
    { auto_refresh: true },
    {
      retry: false,
      enabled: !!api.config?.bearer_token,
    },
  );

  useEffect(() => {
    if (session.data?.bearer_token && session.data.bearer_token !== api.config?.bearer_token) {
      api.setBearerToken(session.data.bearer_token);
    }
  }, [api, session.data?.bearer_token]);

  useEffect(() => {
    if (
      session.error &&
      (session.error.code === 'invalid_bearer_token' || session.error.code === 'not_found')
    ) {
      api.setBearerToken(null);
    }
  }, [api, session.error]);

  return session;
}

export type SessionStatus = 'pending' | 'connected' | 'disconnected';

export function useSessionStatus(): SessionStatus {
  const session = useActiveSession();

  return useMemo<SessionStatus>(() => {
    if (session.fetchStatus === 'fetching') {
      return 'pending';
    }
    if (session.fetchStatus === 'paused') {
      return 'disconnected';
    }
    return session.data?.bearer_token ? 'connected' : 'disconnected';
  }, [session.data?.bearer_token, session.fetchStatus]);
}

export interface SignInBody {
  email: string;
  password: string;
}

export async function signIn(api: ApiContext, body: SignInBody): Promise<Session> {
  const { data } = await api.post<Session, SignInBody>('/sessions', body);
  return data;
}

export function useSignIn(
  options?: Omit<UseMutationOptions<Session, ApiError | AxiosError, SignInBody>, 'mutationFn'>,
): UseMutationResult<Session, ApiError | AxiosError, SignInBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Session, ApiError | AxiosError, SignInBody>(
    (body: SignInBody) => signIn(api, body),
    {
      onSuccess(session: Session) {
        api.setBearerToken(session.bearer_token);
        queryClient.setQueryData(['sessions', 'active'], session);
      },
      ...options,
    },
  );
}

export function useSignOut(): () => void {
  const api = useApi();
  const queryClient = useQueryClient();
  return useCallback(() => {
    queryClient.setQueryData(['sessions', 'active'], null);
    api.setBearerToken(null);
  }, [api, queryClient]);
}
