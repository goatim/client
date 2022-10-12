import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { PaginatedList, useApi } from '../../api';
import CompositionSetting from './model';

export function useCompositionSetting(id?: string): UseQueryResult<CompositionSetting> {
  const api = useApi();
  return useQuery<CompositionSetting>(['composition_settings', id], async () => {
    const { data } = await api.get<CompositionSetting>(`/composition_settings/${id}`);
    return data;
  });
}

export type CompositionSettingList = PaginatedList<'composition_settings', CompositionSetting>;

export function useCompositionSettings(): UseQueryResult<CompositionSettingList> {
  const api = useApi();
  return useQuery<CompositionSettingList>('composition_settings', async () => {
    const { data } = await api.get<CompositionSettingList>('/composition_settings');
    return data;
  });
}

export interface CompositionSettingBody {
  name?: string | null;
  description?: string | null;
  is_default?: boolean;
}

export function usePostCompositionSetting(): UseMutationResult<
  CompositionSetting,
  unknown,
  CompositionSettingBody
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<CompositionSetting, unknown, CompositionSettingBody>(
    async (body: CompositionSettingBody) => {
      const { data } = await api.post<CompositionSetting, CompositionSettingBody>(
        '/composition_settings',
        body,
      );
      return data;
    },
    {
      onSuccess(compositionSetting: CompositionSetting) {
        queryClient.setQueryData(
          ['composition_settings', compositionSetting.id],
          compositionSetting,
        );
      },
    },
  );
}

export type PutCompositionSettingVariables = CompositionSettingBody & { id: string };

export function usePutCompositionSetting(): UseMutationResult<
  CompositionSetting,
  unknown,
  PutCompositionSettingVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<CompositionSetting, unknown, PutCompositionSettingVariables>(
    async ({ id, ...body }: PutCompositionSettingVariables) => {
      const { data } = await api.put<CompositionSetting, CompositionSettingBody>(
        `/composition_settings/${id}`,
        body,
      );
      return data;
    },
    {
      onSuccess(compositionSetting: CompositionSetting) {
        queryClient.setQueryData(
          ['composition_settings', compositionSetting.id],
          compositionSetting,
        );
      },
    },
  );
}
