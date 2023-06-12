import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
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
  persist = false,
): Promise<Session> {
  try {
    const { data } = await api.get<Session, GetSessionQuery>(`/sessions/${id}`, query);

    if (persist && api.config?.bearer_token !== data.bearer_token) {
      api.setBearerToken(data.bearer_token || null);
    }
    return data;
  } catch (error) {
    if (
      persist &&
      error &&
      typeof error === 'object' &&
      'code' in error &&
      (error.code === 'invalid_bearer_token' || error.code === 'not_found')
    ) {
      api.setBearerToken(null);
    }
    throw error;
  }
}

export function useSession(
  id?: string,
  query?: GetSessionQuery,
  options?: Omit<UseQueryOptions<Session, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
  persist = false,
): UseQueryResult<Session, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Session, ApiError | AxiosError>(
    ['sessions', id],
    () => getSession(api, id as string, query, persist),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options?.enabled && !!id : !!id,
    },
  );
}

export function useActiveSession(): UseQueryResult<Session> {
  const api = useApi();
  return useSession(
    'active',
    { auto_refresh: true },
    {
      retry: false,
      enabled: !!api.config?.bearer_token,
    },
    true,
  );
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
