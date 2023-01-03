import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import User from './model';
import { PaginatedList, RequestBody, RequestQuery, useApi } from '../../api';

export function useUser(id?: string): UseQueryResult<User> {
  const api = useApi();
  return useQuery<User>(
    ['users', id],
    async () => {
      const { data } = await api.get<User>(`/users/${id}`);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export function useMe(): UseQueryResult<User> {
  return useUser('me');
}

export type UserList = PaginatedList<'users', User>;

export function useUsers(): UseQueryResult<UserList> {
  const api = useApi();
  return useQuery<UserList>('users', async () => {
    const { data } = await api.get<UserList>('/users');
    return data;
  });
}

export interface UserBody extends RequestBody {
  email?: string | null;
  gender?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  pseudo?: string | null;
  phone?: string | null;
  birthday?: string | null;
  address?: string | null;
  country?: string | null;
  locale?: string | null;
}

export interface PostUserQuery extends RequestQuery {
  create_session?: boolean;
}

export function usePostUser(
  createSession?: boolean,
  userKey?: string,
): UseMutationResult<User, unknown, UserBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<User, unknown, UserBody>(
    async (body: UserBody) => {
      const { data } = await api.post<User, UserBody, PostUserQuery>('/users', body, {
        create_session: createSession,
      });
      return data;
    },
    {
      onSuccess({ session, ...user }: User) {
        if (session) {
          queryClient.setQueryData(['sessions', 'active'], session);
          api.setBearerToken(session.bearer_token);
        }
        queryClient.setQueryData(['users', userKey || user.id], user);
      },
    },
  );
}

export type PutUserVariables = UserBody & { id: string };

export function usePutUser(): UseMutationResult<User, unknown, PutUserVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<User, unknown, PutUserVariables>(
    async ({ id, ...body }: PutUserVariables) => {
      const { data } = await api.put<User, UserBody>(`/users/${id}`, body);
      return data;
    },
    {
      onSuccess(user: User) {
        queryClient.setQueryData(['users', user.id], user);
      },
    },
  );
}

export type AddUserPictureBody = { picture: File };

export type AddUserPictureVariables = AddUserPictureBody & { id: string };

export function useAddUserPicture(): UseMutationResult<User, unknown, AddUserPictureVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<User, unknown, AddUserPictureVariables>(
    async ({ id, picture }: AddUserPictureVariables) => {
      const { data } = await api.post<User>(`/users/${id}/picture`, { picture });
      return data;
    },
    {
      onSuccess(user: User) {
        queryClient.setQueryData(['users', user.id], user);
      },
    },
  );
}

export interface UsePostUserPasswordResetBody extends RequestBody {
  email?: string;
}

export function usePostUserPasswordReset(): UseMutationResult<
  void,
  unknown,
  UsePostUserPasswordResetBody
> {
  const api = useApi();
  return useMutation<void, unknown, UsePostUserPasswordResetBody>(
    async (body: UsePostUserPasswordResetBody) => {
      const { data } = await api.post<void, UsePostUserPasswordResetBody>(
        '/users/password_reset',
        body,
      );
      return data;
    },
  );
}
