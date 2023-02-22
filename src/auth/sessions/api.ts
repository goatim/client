import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useCallback } from 'react';
import { UseQueryOptions } from 'react-query/types/react/types';
import { AxiosError } from 'axios';
import { Session } from './model';
import { ApiContext, ApiError, RequestBody, RequestQuery, useApi } from '../../api';

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
  return useSession(
    'active',
    { auto_refresh: true },
    {
      retry: false,
      onSuccess: (session: Session) => {
        api.setBearerToken(session.bearer_token);
      },
      onError: (error) => {
        if (error.code === 'invalid_bearer_token') {
          api.setBearerToken(null);
        }
      },
      enabled: !!api.config?.bearer_token,
    },
  );
}

export interface SignInBody extends RequestBody {
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
        queryClient.setQueryData(['sessions', 'active'], session);
        api.setBearerToken(session.bearer_token);
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
