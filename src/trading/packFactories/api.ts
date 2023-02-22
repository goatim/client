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
import {
  ApiContext,
  ApiError,
  ListRequestQuery,
  PaginatedList,
  RequestBody,
  useApi,
} from '../../api';
import { PackFactory } from './model';

export async function getPackFactory(api: ApiContext, id: string): Promise<PackFactory> {
  const { data } = await api.get<PackFactory>(`/pack_factories/${id}`);
  return data;
}

export function usePackFactory(
  id?: string,
  options?: Omit<UseQueryOptions<PackFactory, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<PackFactory, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<PackFactory, ApiError | AxiosError>(
    ['pack_factories', id],
    () => getPackFactory(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type PackFactoryList = PaginatedList<'pack_factories', PackFactory>;

export interface GetPackFactoriesQuery extends ListRequestQuery {
  tags?: string[] | string;
  stock_tags?: string[] | string;
  margin?: string[] | string;
}

export async function getPackFactories(
  api: ApiContext,
  query?: GetPackFactoriesQuery,
): Promise<PackFactoryList> {
  const { data } = await api.get<PackFactoryList>('/pack_factories', query);
  return data;
}

export function usePackFactories(
  query?: GetPackFactoriesQuery,
  options?: Omit<UseQueryOptions<PackFactoryList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<PackFactoryList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<PackFactoryList, ApiError | AxiosError>(
    ['pack_factories', query],
    () => getPackFactories(api, query),
    options,
  );
}

export interface PackFactoryBody extends RequestBody {
  name?: string | null;
  description?: string | null;
  tags?: string | null;
  stock_tags?: string | null;
  odds?: string | null;
  breakdown?: string | null;
  margin?: number;
  title?: string;
  message?: string;
}

export async function postPackFactory(
  api: ApiContext,
  body: PackFactoryBody,
): Promise<PackFactory> {
  const { data } = await api.post<PackFactory, PackFactoryBody>('/pack_factories', body);
  return data;
}

export function usePostPackFactory(
  options?: Omit<
    UseMutationOptions<PackFactory, ApiError | AxiosError, PackFactoryBody>,
    'mutationFn'
  >,
): UseMutationResult<PackFactory, ApiError | AxiosError, PackFactoryBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PackFactory, ApiError | AxiosError, PackFactoryBody>(
    (body: PackFactoryBody) => postPackFactory(api, body),
    {
      onSuccess(packFactory: PackFactory) {
        queryClient.setQueryData(['pack_factories', packFactory.id], packFactory);
      },
      ...options,
    },
  );
}

export async function putPackFactory(
  api: ApiContext,
  id: string,
  body: PackFactoryBody,
): Promise<PackFactory> {
  const { data } = await api.put<PackFactory, PackFactoryBody>(`/pack_factories/${id}`, body);
  return data;
}

export type PutPackFactoryVariables = PackFactoryBody & { id: string };

export function usePutPackFactory(
  options?: Omit<
    UseMutationOptions<PackFactory, ApiError | AxiosError, PutPackFactoryVariables>,
    'mutationFn'
  >,
): UseMutationResult<PackFactory, ApiError | AxiosError, PutPackFactoryVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PackFactory, ApiError | AxiosError, PutPackFactoryVariables>(
    ({ id, ...body }: PutPackFactoryVariables) => putPackFactory(api, id, body),
    {
      onSuccess(packFactory: PackFactory) {
        queryClient.setQueryData(['pack_factories', packFactory.id], packFactory);
      },
      ...options,
    },
  );
}

export interface PostPackFactoryIconBody extends RequestBody {
  icon: File;
}

export async function postPackFactoryIcon(
  api: ApiContext,
  id: string,
  body: PostPackFactoryIconBody,
): Promise<PackFactory> {
  const { data } = await api.post<PackFactory>(`/pack_factories/${id}/icon`, body);
  return data;
}

export type PostPackFactoryIconVariables = PostPackFactoryIconBody & { id: string };

export function usePostPackFactoryIcon(
  options?: Omit<
    UseMutationOptions<PackFactory, ApiError | AxiosError, PostPackFactoryIconVariables>,
    'mutationFn'
  >,
): UseMutationResult<PackFactory, ApiError | AxiosError, PostPackFactoryIconVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PackFactory, ApiError | AxiosError, PostPackFactoryIconVariables>(
    ({ id, ...body }: PostPackFactoryIconVariables) => postPackFactoryIcon(api, id, body),
    {
      onSuccess(packFactory: PackFactory) {
        queryClient.setQueryData(['pack_factories', packFactory.id], packFactory);
      },
      ...options,
    },
  );
}
