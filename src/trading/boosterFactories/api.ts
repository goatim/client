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
import { BoosterFactory } from './model';
import { useActiveWallet } from '../../market';

export async function getBoosterFactory(api: ApiContext, id: string): Promise<BoosterFactory> {
  const { data } = await api.get<BoosterFactory>(`/booster_factories/${id}`);
  return data;
}

export function useBoosterFactory(
  id?: string,
  options?: Omit<UseQueryOptions<BoosterFactory, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<BoosterFactory, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<BoosterFactory, ApiError | AxiosError>(
    ['booster_factories', id],
    () => getBoosterFactory(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options && !!id : !!id,
    },
  );
}

export type BoosterFactoryList = PaginatedList<'booster_factories', BoosterFactory>;

export interface GetBoosterFactoriesQuery extends ListRequestQuery {
  wallet?: string;
}

export async function getBoosterFactories(
  api: ApiContext,
  query?: GetBoosterFactoriesQuery,
): Promise<BoosterFactoryList> {
  const { data } = await api.get<BoosterFactoryList>('/booster_factories', query);
  return data;
}

export interface UseBoosterFactoriesOptions
  extends Omit<UseQueryOptions<BoosterFactoryList, ApiError | AxiosError>, 'queryFn' | 'queryKey'> {
  onCreated?: (boosterFactory: BoosterFactory) => unknown;
  onUpdated?: (boosterFactory: BoosterFactory) => unknown;
}

export function useBoosterFactories(
  query?: GetBoosterFactoriesQuery,
  options?: UseBoosterFactoriesOptions,
): UseQueryResult<BoosterFactoryList, ApiError | AxiosError> {
  const api = useApi();
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   const socket = api.openSocket('/booster-factories', ['booster-factories', query], {
  //     query,
  //   });

  //   socket.on('connect_error', (error) => {
  //     console.error(error);
  //   });

  //   socket.on('created', async (boosterFactory: BoosterFactory) => {
  //     if (options?.onCreated) {
  //       options.onCreated(boosterFactory);
  //     }
  //     await queryClient.refetchQueries(['booster_factories', query]);
  //   });

  //   socket.on('updated', async (boosterFactory: BoosterFactory) => {
  //     if (options?.onUpdated) {
  //       options.onUpdated(boosterFactory);
  //     }
  //     await queryClient.refetchQueries(['booster_factories', query]);
  //   });

  //   return () => {
  //     socket.off('connect_error');
  //     socket.off('created');
  //     socket.off('updated');
  //   };
  // }, [api, options, query, queryClient]);

  return useQuery<BoosterFactoryList, ApiError | AxiosError>(
    ['booster_factories', query],
    () => getBoosterFactories(api, query),
    options,
  );
}

export function useActiveWalletBoosterFactories(
  query: Omit<GetBoosterFactoriesQuery, 'wallet'>,
  options?: Omit<
    UseQueryOptions<BoosterFactoryList, ApiError | AxiosError>,
    'queryFn' | 'queryKey'
  >,
): UseQueryResult<BoosterFactoryList, ApiError | AxiosError> {
  const wallet = useActiveWallet();
  return useBoosterFactories({ ...query, wallet: wallet.data?.id }, options);
}

export interface BoosterFactoryBody {
  name?: string | null;
  description?: string | null;
  price?: number;
  vat?: string | null;
  leverage?: number;
  duration?: number;
}

export async function postBoosterFactory(
  api: ApiContext,
  body: BoosterFactoryBody,
): Promise<BoosterFactory> {
  const { data } = await api.post<BoosterFactory, BoosterFactoryBody>('/booster_factories', body);
  return data;
}

export function usePostBoosterFactory(
  options?: Omit<
    UseMutationOptions<BoosterFactory, ApiError | AxiosError, BoosterFactoryBody>,
    'mutationFn'
  >,
): UseMutationResult<BoosterFactory, ApiError | AxiosError, BoosterFactoryBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<BoosterFactory, ApiError | AxiosError, BoosterFactoryBody>(
    (body: BoosterFactoryBody) => postBoosterFactory(api, body),
    {
      onSuccess(boosterFactory: BoosterFactory) {
        queryClient.setQueryData(['booster_factories', boosterFactory.id], boosterFactory);
      },
      ...options,
    },
  );
}

export async function putBoosterFactory(
  api: ApiContext,
  id: string,
  body: BoosterFactoryBody,
): Promise<BoosterFactory> {
  const { data } = await api.put<BoosterFactory, BoosterFactoryBody>(
    `/booster_factories/${id}`,
    body,
  );
  return data;
}

export type PutBoosterFactoryVariables = BoosterFactoryBody & { id: string };

export function usePutBoosterFactory(
  options?: Omit<
    UseMutationOptions<BoosterFactory, ApiError | AxiosError, PutBoosterFactoryVariables>,
    'mutationFn'
  >,
): UseMutationResult<BoosterFactory, ApiError | AxiosError, PutBoosterFactoryVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<BoosterFactory, ApiError | AxiosError, PutBoosterFactoryVariables>(
    ({ id, ...body }: PutBoosterFactoryVariables) => putBoosterFactory(api, id, body),
    {
      onSuccess(boosterFactory: BoosterFactory) {
        queryClient.setQueryData(['booster_factories', boosterFactory.id], boosterFactory);
      },
      ...options,
    },
  );
}

export async function deleteBoosterFactory(api: ApiContext, id: string): Promise<void> {
  await api.delete<void>(`/booster_factories/${id}`);
}

export function useDeleteBoosterFactory(
  options?: Omit<UseMutationOptions<void, ApiError | AxiosError, string>, 'mutationFn'>,
): UseMutationResult<void, ApiError | AxiosError, string> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, ApiError | AxiosError, string>((id) => deleteBoosterFactory(api, id), {
    onSuccess(res, id) {
      queryClient.removeQueries(['booster_factories', id], { exact: true });
      // TODO : Remove in list
    },
    ...options,
  });
}
