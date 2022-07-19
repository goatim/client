import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { ListRequestParams, PaginatedList, RequestBody, useApi } from '../../api';
import Spotlight from './model';

export function useSpotlight(id?: string): UseQueryResult<Spotlight> {
  const api = useApi();
  return useQuery<Spotlight>(
    ['spotlights', id],
    async () => {
      const { data } = await api.get<Spotlight>(`/spotlights/${id}`);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export type SpotlightList = PaginatedList<'spotlights', Spotlight>;

export interface GetSpotlightsParams extends ListRequestParams {
  tags?: string[] | string;
  club?: string;
  league?: string;
}

export function useSpotlights(params?: GetSpotlightsParams): UseQueryResult<SpotlightList> {
  const api = useApi();
  return useQuery<SpotlightList>(['spotlights', params], async () => {
    const { data } = await api.get<SpotlightList>('/spotlights', params);
    return data;
  });
}

export interface SpotlightBody extends RequestBody {
  tags?: string;
  type?: string;
  subtitle?: string;
  title?: string;
  description?: string;
  primary_color?: string;
  secondary_color?: string;
  club?: string;
  league?: string;
  primary_assets?: string;
  secondary_assets?: string;
}

export function useCreateSpotlight(): UseMutationResult<Spotlight, unknown, SpotlightBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Spotlight, unknown, SpotlightBody>(
    async (body: SpotlightBody) => {
      const { data } = await api.post<Spotlight>('/spotlights', body);
      return data;
    },
    {
      onSuccess(spotlight: Spotlight) {
        queryClient.setQueryData(['spotlights', spotlight.id], spotlight);
      },
    },
  );
}

export type UpdateSpotlightVariables = SpotlightBody & { id: string };

export function useUpdateSpotlight(): UseMutationResult<
  Spotlight,
  unknown,
  UpdateSpotlightVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Spotlight, unknown, UpdateSpotlightVariables>(
    async ({ id, ...body }: UpdateSpotlightVariables) => {
      const { data } = await api.put<Spotlight>(`/spotlights/${body}`, body);
      return data;
    },
    {
      onSuccess(spotlight: Spotlight) {
        queryClient.setQueryData(['spotlights', spotlight.id], spotlight);
      },
    },
  );
}

export type AddSpotlightIllustrationBody = { illustration: File };

export type AddSpotlightIllustrationVariables = AddSpotlightIllustrationBody & { id: string };

export function useAddSpotlightIllustration(): UseMutationResult<
  Spotlight,
  unknown,
  AddSpotlightIllustrationVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Spotlight, unknown, AddSpotlightIllustrationVariables>(
    async ({ id, illustration }: AddSpotlightIllustrationVariables) => {
      const { data } = await api.post<Spotlight>(`/spotlights/${id}/illustration`, {
        illustration,
      });
      return data;
    },
    {
      onSuccess(spotlight: Spotlight) {
        queryClient.setQueryData(['spotlights', spotlight.id], spotlight);
      },
    },
  );
}
