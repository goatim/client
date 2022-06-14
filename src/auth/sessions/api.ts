import { RequestBody, useApi } from '@cezembre/fronts';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from 'react-query';
import Session from './model';

export function useSession(id: string): UseQueryResult<Session> {
  const api = useApi();
  return useQuery<Session>(['sessions', id], async () => {
    const { data } = await api.get<Session>(`/sessions/${id}`);
    return data;
  });
}

export function useActiveSession(): UseQueryResult<Session> {
  return useSession('active');
}

export interface SignInBody extends RequestBody {
  email?: string;
  password?: string;
}

export function useSignIn(): UseMutationResult<Session, unknown, SignInBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Session, unknown, SignInBody>(
    async (body: SignInBody) => {
      const { data } = await api.post<Session>('/sessions', body);
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
