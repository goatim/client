import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { AxiosError } from 'axios';
import { Socket } from 'socket.io-client';
import { Post } from './model';
import {
  ApiContext,
  ApiError,
  ListRequestQuery,
  PaginatedList,
  RequestBody,
  RequestQuery,
  useApi,
} from '../../api';

export type GetPostQuery = RequestQuery;

export async function getPost(api: ApiContext, id: string, query?: GetPostQuery): Promise<Post> {
  const { data } = await api.get<Post, RequestQuery>(`/posts/${id}`, query);
  return data;
}

export function usePost(
  id?: string,
  query?: GetPostQuery,
  options?: Omit<UseQueryOptions<Post, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Post, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Post, ApiError | AxiosError>(
    ['posts', id],
    () => getPost(api, id as string, query),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options?.enabled && !!id : !!id,
    },
  );
}

export type PostList = PaginatedList<'posts', Post>;

export interface GetPostsQuery extends ListRequestQuery {
  wallet?: string;
}

export async function getPosts(api: ApiContext, query?: GetPostQuery): Promise<PostList> {
  const { data } = await api.get<PostList>('/posts', query);
  return data;
}

export interface UsePostsOptions {
  onCreated?: (post: Post) => unknown;
  onUpdated?: (post: Post) => unknown;
}

export function usePosts(
  query?: GetPostsQuery,
  options?: UsePostsOptions,
): UseQueryResult<PostList, ApiError | AxiosError> {
  const api = useApi();
  const queryClient = useQueryClient();
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socket.current && query?.wallet) {
      socket.current = api.createSocket('/posts', {
        query,
      });

      socket.current.on('connect_error', (error) => {
        console.error(error);
      });

      socket.current.on('created', async (post: Post) => {
        if (options?.onCreated) {
          options.onCreated(post);
        }
        await queryClient.refetchQueries(['posts', query]);
      });

      socket.current.on('updated', async (post: Post) => {
        if (options?.onUpdated) {
          options.onUpdated(post);
        }
        await queryClient.refetchQueries(['posts', query]);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.close();
        socket.current = null;
      }
    };
  }, [api, options, query, queryClient]);

  return useQuery<PostList, ApiError | AxiosError>(['posts', query], () => getPosts(api, query), {
    staleTime: Infinity,
  });
}

export interface PostBody extends RequestBody {
  user?: string;
  author?: string;
  wallet?: string;
}

export async function putPost(api: ApiContext, id: string, body: PostBody): Promise<Post> {
  const { data } = await api.put<Post, PostBody>(`/posts/${id}`, body);
  return data;
}

export type PutPostVariables = PostBody & { id: string };

export function usePutPost(
  options?: Omit<UseMutationOptions<Post, ApiError | AxiosError, PostBody>, 'mutationFn'>,
): UseMutationResult<Post, ApiError | AxiosError, PutPostVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Post, ApiError | AxiosError, PutPostVariables>(
    ({ id, ...body }: PutPostVariables) => putPost(api, id, body),
    {
      onSuccess(post: Post) {
        queryClient.setQueryData(['posts', post.id], post);
      },
      ...options,
    },
  );
}
