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
import { ApiContext, ApiError, ListRequestQuery, PaginatedList, useApi } from '../../api';
import { WheelDraw } from './model';

export async function getWheelDraw(api: ApiContext, id: string): Promise<WheelDraw> {
  const { data } = await api.get<WheelDraw>(`/wheel_draws/${id}`);
  return data;
}

export function useWheelDraw(
  id?: string,
  options?: Omit<UseQueryOptions<WheelDraw, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<WheelDraw, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<WheelDraw, ApiError | AxiosError>(
    ['wheel_draws', id],
    () => getWheelDraw(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type WheelDrawList = PaginatedList<'wheel_draws', WheelDraw>;

export interface GetWheelDrawsQuery extends ListRequestQuery {
  wallet?: string;
  source?: string;
}

export async function getWheelDraws(
  api: ApiContext,
  query?: GetWheelDrawsQuery,
): Promise<WheelDrawList> {
  const { data } = await api.get<WheelDrawList>('/wheel_draws', query);
  return data;
}

export function useWheelDraws(
  query?: GetWheelDrawsQuery,
  options?: Omit<UseQueryOptions<WheelDrawList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<WheelDrawList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<WheelDrawList, ApiError | AxiosError>(
    ['wheel_draws', query],
    () => getWheelDraws(api, query),
    options,
  );
}

export interface PostWheelDrawBody {
  wallet?: string | null;
}

export async function postWheelDraw(api: ApiContext, body: PostWheelDrawBody): Promise<WheelDraw> {
  const { data } = await api.post<WheelDraw, PostWheelDrawBody>('/wheel_draws', body);
  return data;
}

export function usePostWheelDraw(
  options?: Omit<
    UseMutationOptions<WheelDraw, ApiError | AxiosError, PostWheelDrawBody>,
    'mutationFn'
  >,
): UseMutationResult<WheelDraw, ApiError | AxiosError, PostWheelDrawBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<WheelDraw, ApiError | AxiosError, PostWheelDrawBody>(
    (body: PostWheelDrawBody) => postWheelDraw(api, body),
    {
      onSuccess(wheelDraw: WheelDraw) {
        queryClient.setQueryData(['wheel_draws', wheelDraw.id], wheelDraw);
      },
      ...options,
    },
  );
}

export interface PutWheelDrawBody {
  wallet?: string | null;
}

export async function putWheelDraw(
  api: ApiContext,
  id: string,
  body: PutWheelDrawBody,
): Promise<WheelDraw> {
  const { data } = await api.put<WheelDraw, PostWheelDrawBody>(`/wheel_draws/${id}`, body);
  return data;
}

export type PutWheelDrawVariables = PutWheelDrawBody & { id: string };

export function usePutWheelDraw(
  options?: Omit<
    UseMutationOptions<WheelDraw, ApiError | AxiosError, PutWheelDrawVariables>,
    'mutationFn'
  >,
): UseMutationResult<WheelDraw, ApiError | AxiosError, PutWheelDrawVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<WheelDraw, ApiError | AxiosError, PutWheelDrawVariables>(
    ({ id, ...body }: PutWheelDrawVariables) => putWheelDraw(api, id, body),
    {
      onSuccess(wheelDraw: WheelDraw) {
        queryClient.setQueryData(['wheel_draws', wheelDraw.id], wheelDraw);
      },
      ...options,
    },
  );
}
