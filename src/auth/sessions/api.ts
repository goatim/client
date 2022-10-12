import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from 'react-query';
import { useCallback } from 'react';
import { UseQueryOptions } from 'react-query/types/react/types';
import { AxiosError } from 'axios';
import Session from './model';
import { ApiError, useApi } from '../../api';

export interface GetSessionQuery {
  auto_refresh?: boolean;
}

export function useSession(
  id: string,
  query?: GetSessionQuery,
  options?: UseQueryOptions<Session, ApiError | AxiosError>,
): UseQueryResult<Session, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Session, ApiError | AxiosError>(
    ['sessions', id],
    async () => {
      const { data } = await api.get<Session, GetSessionQuery>(`/sessions/${id}`, query);
      return data;
    },
    {
      ...options,
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
      onError: (error) => {
        if (error.code === 'invalid_bearer_token') {
          api.setBearerToken(null);
        }
      },
      enabled: !!api.config?.bearer_token,
    },
  );
}

export interface SignInBody {
  email?: string;
  password?: string;
}

export function useSignIn(): UseMutationResult<Session, unknown, SignInBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Session, unknown, SignInBody>(
    async (body: SignInBody) => {
      const { data } = await api.post<Session, SignInBody>('/sessions', body);
      return data;
    },
    {
      onSuccess(session: Session) {
        queryClient.setQueryData(['sessions', 'active'], session);
        api.setBearerToken(session.bearer_token);
      },
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
