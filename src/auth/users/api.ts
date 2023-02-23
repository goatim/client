import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { AxiosError } from 'axios';
import { User } from './model';
import { ApiContext, ApiError, PaginatedList, RequestBody, RequestQuery, useApi } from '../../api';
import { useActiveSession } from '../sessions';

export async function getUser(api: ApiContext, id: string): Promise<User> {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
}

export function useUser(
  id?: string,
  options?: Omit<UseQueryOptions<User, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<User, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<User, ApiError | AxiosError>(['users', id], () => getUser(api, id as string), {
    ...options,
    enabled: options?.enabled !== undefined ? options?.enabled && !!id : !!id,
  });
}

export function useActiveUser(): UseQueryResult<User, ApiError | AxiosError> {
  const session = useActiveSession();
  return useUser(
    typeof session.data?.user === 'object' ? session.data?.user.id : session.data?.user,
  );
}

export interface GetUsersQuery extends RequestQuery {
  first_name?: string;
  last_name?: string;
  verified_email?: boolean;
  verified_phone?: boolean;
}

export type UserList = PaginatedList<'users', User>;

export async function getUsers(api: ApiContext, query?: GetUsersQuery): Promise<UserList> {
  const { data } = await api.get<UserList>('/users', query);
  return data;
}

export function useUsers(
  query?: GetUsersQuery,
  options?: Omit<UseQueryOptions<UserList, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<UserList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<UserList, ApiError | AxiosError>('users', () => getUsers(api, query), options);
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
  verified_email?: boolean;
}

export interface PostUserBody extends UserBody {
  password?: string | null;
  referrer?: string | null;
}

export interface PostUserQuery extends RequestQuery {
  create_session?: boolean;
}

export async function postUser(
  api: ApiContext,
  body: PostUserBody,
  query?: PostUserQuery,
): Promise<User> {
  const { data } = await api.post<User, PostUserBody, PostUserQuery>('/users', body, query);
  return data;
}

export function usePostUser(
  query?: PostUserQuery,
  options?: Omit<UseMutationOptions<User, ApiError | AxiosError, PostUserBody>, 'mutationFn'>,
): UseMutationResult<User, ApiError | AxiosError, PostUserBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<User, ApiError | AxiosError, PostUserBody>(
    (body: PostUserBody) => postUser(api, body, query),
    {
      onSuccess({ session, ...user }: User) {
        if (session) {
          queryClient.setQueryData(['sessions', 'active'], session);
          api.setBearerToken(session.bearer_token);
        }
        queryClient.setQueryData(['users', user.id], user);
      },
      ...options,
    },
  );
}

export interface PostUserVerifyEmailBody extends RequestBody {
  token: string;
}

export async function postUserVerifyEmail(
  api: ApiContext,
  body: PostUserVerifyEmailBody,
): Promise<void> {
  const { data } = await api.post<void, PostUserVerifyEmailBody>('/users/verify_email', body);
  return data;
}

export function usePostUserVerifyEmail(
  options?: Omit<
    UseMutationOptions<void, ApiError | AxiosError, PostUserVerifyEmailBody>,
    'mutationFn'
  >,
): UseMutationResult<void, ApiError | AxiosError, PostUserVerifyEmailBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, ApiError | AxiosError, PostUserVerifyEmailBody>(
    (body: PostUserVerifyEmailBody) => postUserVerifyEmail(api, body),
    {
      onSuccess: () => queryClient.invalidateQueries(['sessions', 'active']),
      ...options,
    },
  );
}

export async function putUser(api: ApiContext, id: string, body: UserBody): Promise<User> {
  const { data } = await api.put<User, UserBody>(`/users/${id}`, body);
  return data;
}

export type PutUserVariables = UserBody & { id: string };

export function usePutUser(
  options?: Omit<UseMutationOptions<User, ApiError | AxiosError, PutUserVariables>, 'mutationFn'>,
): UseMutationResult<User, ApiError | AxiosError, PutUserVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<User, ApiError | AxiosError, PutUserVariables>(
    ({ id, ...body }: PutUserVariables) => putUser(api, id, body),
    {
      onSuccess(user: User) {
        queryClient.setQueryData(['users', user.id], user);
      },
      ...options,
    },
  );
}

export type PostUserPictureBody = { picture: File };

export async function postUserPicture(
  api: ApiContext,
  id: string,
  body: PostUserPictureBody,
): Promise<User> {
  const { data } = await api.post<User>(`/users/${id}/picture`, body);
  return data;
}

export type PostUserPictureVariables = PostUserPictureBody & { id: string };

export function useAddUserPicture(
  options?: Omit<
    UseMutationOptions<User, ApiError | AxiosError, PostUserPictureVariables>,
    'mutationFn'
  >,
): UseMutationResult<User, ApiError | AxiosError, PostUserPictureVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<User, ApiError | AxiosError, PostUserPictureVariables>(
    ({ id, ...body }: PostUserPictureVariables) => postUserPicture(api, id, body),
    {
      onSuccess(user: User) {
        queryClient.setQueryData(['users', user.id], user);
      },
      ...options,
    },
  );
}

export interface PostUserPasswordResetRequestBody extends RequestBody {
  email: string;
}

export async function postUserPasswordResetRequest(
  api: ApiContext,
  body: PostUserPasswordResetRequestBody,
): Promise<void> {
  const { data } = await api.post<void, PostUserPasswordResetRequestBody>(
    '/users/password_reset_request',
    body,
  );
  return data;
}

export function usePostUserPasswordResetRequest(
  options?: Omit<
    UseMutationOptions<void, ApiError | AxiosError, PostUserPasswordResetRequestBody>,
    'mutationFn'
  >,
): UseMutationResult<void, ApiError | AxiosError, PostUserPasswordResetRequestBody> {
  const api = useApi();
  return useMutation<void, ApiError | AxiosError, PostUserPasswordResetRequestBody>(
    (body: PostUserPasswordResetRequestBody) => postUserPasswordResetRequest(api, body),
    options,
  );
}

export interface PostUserResetPasswordBody extends RequestBody {
  token: string;
  password: string;
}

export async function postUserResetPassword(
  api: ApiContext,
  body: PostUserResetPasswordBody,
): Promise<void> {
  const { data } = await api.post<void, PostUserResetPasswordBody>('/users/reset_password', body);
  return data;
}

export function usePostUserResetPassword(
  options?: Omit<
    UseMutationOptions<void, ApiError | AxiosError, PostUserResetPasswordBody>,
    'mutationFn'
  >,
): UseMutationResult<void, ApiError | AxiosError, PostUserResetPasswordBody> {
  const api = useApi();
  return useMutation<void, ApiError | AxiosError, PostUserResetPasswordBody>(
    (body: PostUserResetPasswordBody) => postUserResetPassword(api, body),
    options,
  );
}
