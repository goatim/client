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
import { ApiContext, ApiError, PaginatedList, useApi } from '../../api';
import { CompositionSetting } from './model';

export async function getCompositionSetting(
  api: ApiContext,
  id: string,
): Promise<CompositionSetting> {
  const { data } = await api.get<CompositionSetting>(`/composition_settings/${id}`);
  return data;
}

export function useCompositionSetting(
  id?: string,
  options?: Omit<
    UseQueryOptions<CompositionSetting, ApiError | AxiosError>,
    'queryFn' | 'queryKey'
  >,
): UseQueryResult<CompositionSetting, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<CompositionSetting, ApiError | AxiosError>(
    ['composition_settings', id],
    () => getCompositionSetting(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type CompositionSettingList = PaginatedList<'composition_settings', CompositionSetting>;

export async function getCompositionSettings(api: ApiContext): Promise<CompositionSettingList> {
  const { data } = await api.get<CompositionSettingList>('/composition_settings');
  return data;
}

export function useCompositionSettings(
  options?: Omit<
    UseQueryOptions<CompositionSettingList, ApiError | AxiosError>,
    'queryFn' | 'queryKey'
  >,
): UseQueryResult<CompositionSettingList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<CompositionSettingList, ApiError | AxiosError>(
    ['composition_settings'],
    () => getCompositionSettings(api),
    options,
  );
}

export interface CompositionSettingBody {
  name?: string | null;
  description?: string | null;
  is_default?: boolean;
}

export async function postCompositionSetting(
  api: ApiContext,
  body: CompositionSettingBody,
): Promise<CompositionSetting> {
  const { data } = await api.post<CompositionSetting, CompositionSettingBody>(
    '/composition_settings',
    body,
  );
  return data;
}

export function usePostCompositionSetting(
  options?: Omit<
    UseMutationOptions<CompositionSetting, ApiError | AxiosError, CompositionSettingBody>,
    'mutationFn'
  >,
): UseMutationResult<CompositionSetting, ApiError | AxiosError, CompositionSettingBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<CompositionSetting, ApiError | AxiosError, CompositionSettingBody>(
    (body: CompositionSettingBody) => postCompositionSetting(api, body),
    {
      onSuccess(compositionSetting: CompositionSetting) {
        queryClient.setQueryData(
          ['composition_settings', compositionSetting.id],
          compositionSetting,
        );
      },
      ...options,
    },
  );
}

export async function putCompositionSetting(
  api: ApiContext,
  id: string,
  body: CompositionSettingBody,
): Promise<CompositionSetting> {
  const { data } = await api.put<CompositionSetting, CompositionSettingBody>(
    `/composition_settings/${id}`,
    body,
  );
  return data;
}

export type PutCompositionSettingVariables = CompositionSettingBody & { id: string };

export function usePutCompositionSetting(
  options?: Omit<
    UseMutationOptions<CompositionSetting, ApiError | AxiosError, PutCompositionSettingVariables>,
    'mutationFn'
  >,
): UseMutationResult<CompositionSetting, ApiError | AxiosError, PutCompositionSettingVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<CompositionSetting, ApiError | AxiosError, PutCompositionSettingVariables>(
    ({ id, ...body }: PutCompositionSettingVariables) => putCompositionSetting(api, id, body),
    {
      onSuccess(compositionSetting: CompositionSetting) {
        queryClient.setQueryData(
          ['composition_settings', compositionSetting.id],
          compositionSetting,
        );
      },
      ...options,
    },
  );
}
