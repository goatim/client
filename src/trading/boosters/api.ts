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
import {
  ApiContext,
  ApiError,
  ListRequestQuery,
  PaginatedList,
  RequestBody,
  useApi,
} from '../../api';
import { Booster } from './model';
import { useActiveWallet } from '../../market';

export async function getBooster(api: ApiContext, id: string): Promise<Booster> {
  const { data } = await api.get<Booster>(`/boosters/${id}`);
  return data;
}

export function useBooster(
  id?: string,
  options?: Omit<UseQueryOptions<Booster, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Booster, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Booster, ApiError | AxiosError>(
    ['boosters', id],
    () => getBooster(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type BoosterList = PaginatedList<'boosters', Booster>;

export interface GetBoostersQuery extends ListRequestQuery {
  wallet?: string;
  order?: string;
  portfolio?: string;
  composition?: string;
  composition_position?: string;
}

export async function getBoosters(api: ApiContext, query?: GetBoostersQuery): Promise<BoosterList> {
  const { data } = await api.get<BoosterList>('/boosters', query);
  return data;
}

export interface UseBoostersOptions
  extends Omit<UseQueryOptions<BoosterList, ApiError | AxiosError>, 'queryFn' | 'queryKey'> {
  onCreated?: (booster: Booster) => unknown;
  onUpdated?: (booster: Booster) => unknown;
}

export function useBoosters(
  query?: GetBoostersQuery,
  options?: UseBoostersOptions,
): UseQueryResult<BoosterList, ApiError | AxiosError> {
  const api = useApi();
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = api.openSocket('/boosters', ['boosters', query], {
      query,
    });

    socket.on('connect_error', (error) => {
      console.error(error);
    });

    socket.on('created', async (booster: Booster) => {
      if (options?.onCreated) {
        options.onCreated(booster);
      }
      await queryClient.refetchQueries(['boosters', query]);
    });

    socket.on('updated', async (booster: Booster) => {
      if (options?.onUpdated) {
        options.onUpdated(booster);
      }
      await queryClient.refetchQueries(['boosters', query]);
    });

    return () => {
      socket.off('connect_error');
      socket.off('created');
      socket.off('updated');
    };
  }, [api, options, query, queryClient]);

  return useQuery<BoosterList, ApiError | AxiosError>(
    ['boosters', query],
    () => getBoosters(api, query),
    options,
  );
}

export function useActiveWalletBoosters(
  query: Omit<GetBoostersQuery, 'wallet'>,
  options?: Omit<UseQueryOptions<BoosterList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<BoosterList> {
  const wallet = useActiveWallet();
  return useBoosters({ ...query, wallet: wallet.data?.id }, options);
}

export interface BoosterBody extends RequestBody {
  wallet?: string | null;
  order?: string | null;
  portfolio?: string | null;
  composition?: string | null;
  composition_position?: string | null;
  leverage?: number;
  duration?: number;
}

export async function postBooster(api: ApiContext, body: BoosterBody): Promise<Booster> {
  const { data } = await api.post<Booster, BoosterBody>('/boosters', body);
  return data;
}

export function usePostBooster(
  options?: Omit<UseMutationOptions<Booster, ApiError | AxiosError, BoosterBody>, 'mutationFn'>,
): UseMutationResult<Booster, ApiError | AxiosError, BoosterBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Booster, ApiError | AxiosError, BoosterBody>(
    (body: BoosterBody) => postBooster(api, body),
    {
      onSuccess(booster: Booster) {
        queryClient.setQueryData(['boosters', booster.id], booster);
      },
      ...options,
    },
  );
}

export async function putBooster(api: ApiContext, id: string, body: BoosterBody): Promise<Booster> {
  const { data } = await api.put<Booster, BoosterBody>(`/boosters/${id}`, body);
  return data;
}

export type PutBoosterVariables = BoosterBody & { id: string };

export function usePutBooster(
  options?: Omit<
    UseMutationOptions<Booster, ApiError | AxiosError, PutBoosterVariables>,
    'mutationFn'
  >,
): UseMutationResult<Booster, ApiError | AxiosError, PutBoosterVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Booster, ApiError | AxiosError, PutBoosterVariables>(
    ({ id, ...body }: PutBoosterVariables) => putBooster(api, id, body),
    {
      onSuccess(booster: Booster) {
        queryClient.setQueryData(['boosters', booster.id], booster);
      },
      ...options,
    },
  );
}

export async function deleteBooster(api: ApiContext, id: string): Promise<void> {
  await api.delete<void>(`/boosters/${id}`);
}

export function useDeleteBooster(
  options?: Omit<UseMutationOptions<void, ApiError | AxiosError, string>, 'mutationFn'>,
): UseMutationResult<void, ApiError | AxiosError, string> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, ApiError | AxiosError, string>((id) => deleteBooster(api, id), {
    onSuccess(res, id) {
      queryClient.removeQueries(['boosters', id], { exact: true });
      // TODO : Remove in list
    },
    ...options,
  });
}
