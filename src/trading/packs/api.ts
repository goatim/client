import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { ApiContext, ApiError, ListRequestQuery, PaginatedList, useApi } from '../../api';
import { Pack } from './model';

export async function getPack(api: ApiContext, id: string): Promise<Pack> {
  const { data } = await api.get<Pack>(`/packs/${id}`);
  return data;
}

export function usePack(
  id?: string,
  options?: Omit<UseQueryOptions<Pack, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Pack, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Pack, ApiError | AxiosError>(['packs', id], () => getPack(api, id as string), {
    ...options,
    enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
  });
}

export type PackList = PaginatedList<'packs', Pack>;

export interface GetPacksQuery extends ListRequestQuery {
  seen?: boolean;
  wallet?: string;
  tags?: string[] | string;
  asset?: string;
}

export async function getPacks(api: ApiContext, query?: GetPacksQuery): Promise<PackList> {
  const { data } = await api.get<PackList>('/packs', query);
  return data;
}

export interface UsePacksOptions
  extends Omit<UseQueryOptions<PackList, ApiError | AxiosError>, 'queryFn' | 'queryKey'> {
  onCreated?: (pack: Pack) => unknown;
  onUpdated?: (pack: Pack) => unknown;
}

export function usePacks(
  query?: GetPacksQuery,
  options?: UsePacksOptions,
): UseQueryResult<PackList, ApiError | AxiosError> {
  const api = useApi();
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   const socket = api.openSocket('/packs', ['packs', query], {
  //     query,
  //   });

  //   socket.on('connect_error', (error) => {
  //     console.error(error);
  //   });

  //   socket.on('created', async (pack: Pack) => {
  //     if (options?.onCreated) {
  //       options.onCreated(pack);
  //     }
  //     await queryClient.refetchQueries(['packs', query]);
  //   });

  //   socket.on('updated', async (pack: Pack) => {
  //     if (options?.onUpdated) {
  //       options.onUpdated(pack);
  //     }
  //     await queryClient.refetchQueries(['packs', query]);
  //   });

  //   return () => {
  //     socket.off('connect_error');
  //     socket.off('created');
  //     socket.off('updated');
  //   };
  // }, [api, options, query, queryClient]);

  return useQuery<PackList, ApiError | AxiosError>(
    ['packs', query],
    () => getPacks(api, query),
    options,
  );
}

export interface PostPackBody {
  wallet?: string | null;
  share_bulks?: string | null;
  tags?: string | null;
  seen?: boolean;
  title?: string | null;
  message?: string | null;
}

export async function postPack(api: ApiContext, body: PostPackBody): Promise<Pack> {
  const { data } = await api.post<Pack, PostPackBody>('/packs', body);
  return data;
}

export function usePostPack(
  options?: Omit<UseMutationOptions<Pack, ApiError | AxiosError, PostPackBody>, 'mutationFn'>,
): UseMutationResult<Pack, ApiError | AxiosError, PostPackBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Pack, ApiError | AxiosError, PostPackBody>(
    (body: PostPackBody) => postPack(api, body),
    {
      onSuccess(pack: Pack) {
        queryClient.setQueryData(['packs', pack.id], pack);
      },
      ...options,
    },
  );
}

export interface PutPackBody {
  seen?: boolean;
  title?: string | null;
  message?: string | null;
}

export async function putPack(api: ApiContext, id: string, body: PutPackBody): Promise<Pack> {
  const { data } = await api.put<Pack, PostPackBody>(`/packs/${id}`, body);
  return data;
}

export type PutPackVariables = PutPackBody & { id: string };

export function usePutPack(
  options?: Omit<UseMutationOptions<Pack, ApiError | AxiosError, PutPackVariables>, 'mutationFn'>,
): UseMutationResult<Pack, ApiError | AxiosError, PutPackVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Pack, ApiError | AxiosError, PutPackVariables>(
    ({ id, ...body }: PutPackVariables) => putPack(api, id, body),
    {
      onSuccess(pack: Pack) {
        queryClient.setQueryData(['packs', pack.id], pack);
      },
      ...options,
    },
  );
}
