import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from 'react-query';
import Session from './model';
import { RequestBody, useApi } from '../../api';

export function useSession(id: string, onError?: () => void): UseQueryResult<Session> {
  const api = useApi();
  return useQuery<Session>(
    ['sessions', id],
    async () => {
      const { data } = await api.get<Session>(`/sessions/${id}`);
      return data;
    },
    {
      onError,
      retry: false,
    },
  );
}

export function useActiveSession(): UseQueryResult<Session> {
  const api = useApi();
  return useSession('active', () => {
    api.setBearerToken(null);
  });
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
