import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useEffect } from 'react';
import Post from './model';
import { ListRequestQuery, PaginatedList, RequestQuery, useApi } from '../../api';

export type GetPostQuery = RequestQuery;

export function usePost(id?: string, query?: GetPostQuery): UseQueryResult<Post> {
  const api = useApi();
  return useQuery<Post>(
    ['posts', id],
    async () => {
      const { data } = await api.get<Post, RequestQuery>(`/posts/${id}`, query);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export type PostList = PaginatedList<'posts', Post>;

export interface GetPostsQuery extends ListRequestQuery {
  wallet?: boolean;
}

export interface UsePostsOptions {
  onCreated?: (post: Post) => unknown;
  onUpdated?: (post: Post) => unknown;
}

export function usePosts(
  query?: GetPostsQuery,
  options?: UsePostsOptions,
): UseQueryResult<PostList> {
  const api = useApi();
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = api.createSocket('/posts', {
      query,
    });

    socket.on('connect_error', (error) => {
      console.error(error);
    });

    socket.on('created', async (post: Post) => {
      if (options?.onCreated) {
        options.onCreated(post);
      }
      await queryClient.invalidateQueries(['posts', query]);
    });

    socket.on('updated', async (post: Post) => {
      if (options?.onUpdated) {
        options.onUpdated(post);
      }
      await queryClient.invalidateQueries(['posts', query]);
    });

    return () => {
      socket.close();
    };
  }, [api, options, query, queryClient]);

  return useQuery<PostList>(
    ['posts', query],
    async () => {
      const { data } = await api.get<PostList>('/posts', query);
      return data;
    },
    {
      staleTime: Infinity,
    },
  );
}

export interface PostBody {
  user?: string;
  author?: string;
  wallet?: string;
}

export type PutPostVariables = PostBody & { id: string };

export function usePutPost(): UseMutationResult<Post, unknown, PutPostVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Post, unknown, PutPostVariables>(
    async ({ id, ...body }: PutPostVariables) => {
      const { data } = await api.put<Post, PostBody>(`/posts/${id}`, body);
      return data;
    },
    {
      onSuccess(post: Post) {
        queryClient.setQueryData(['posts', post.id], post);
      },
    },
  );
}
