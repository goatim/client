import { useApi, RequestBody, PaginatedList } from '@cezembre/fronts';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import User from './model';

export function useUser(id: string): UseQueryResult<User> {
  const api = useApi();
  return useQuery<User>(['users', id], async () => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  });
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
  phone?: string | null;
  birthday?: string | null;
  address?: string | null;
  country?: string | null;
  locale?: string | null;
}

export function useCreateUser(
  createSession?: boolean,
  userKey?: string,
): UseMutationResult<User, unknown, UserBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<User, unknown, UserBody>(
    async (body: UserBody) => {
      const { data } = await api.post<User>('/users', body, {
        create_session: createSession,
      });
      return data;
    },
    {
      onSuccess({ session, ...user }: User) {
        if (createSession) {
          queryClient.setQueryData(['sessions', 'active'], session);
        }
        queryClient.setQueryData(['users', userKey || user.id], user);
      },
    },
  );
}

export type UpdateUserVariables = UserBody & { id: string };

export function useUpdateUser(): UseMutationResult<User, unknown, UpdateUserVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<User, unknown, UpdateUserVariables>(
    async ({ id, ...body }: UpdateUserVariables) => {
      const { data } = await api.put<User>(`/users/${body}`, body);
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
