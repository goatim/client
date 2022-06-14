import { PaginatedList, useApi } from '@cezembre/fronts';
import { useQuery, UseQueryResult } from 'react-query';
import CompositionSetting from './model';

export function useCompositionSetting(id?: string): UseQueryResult<CompositionSetting> {
  const api = useApi();
  return useQuery<CompositionSetting>(['composition_settings', id], async () => {
    const { data } = await api.get<CompositionSetting>(`/composition_settings/${id}`);
    return data;
  });
}

export type CompositionSettingList = PaginatedList<'compositions_settings', CompositionSetting>;

export function useCompositionSettings(): UseQueryResult<CompositionSettingList> {
  const api = useApi();
  return useQuery<CompositionSettingList>('composition_settings', async () => {
    const { data } = await api.get<CompositionSettingList>('/composition_settings');
    return data;
  });
}
