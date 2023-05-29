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
import { Spotlight } from './model';

export async function getSpotlight(api: ApiContext, id: string): Promise<Spotlight> {
  const { data } = await api.get<Spotlight>(`/spotlights/${id}`);
  return data;
}

export function useSpotlight(
  id?: string,
  options?: Omit<UseQueryOptions<Spotlight, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Spotlight, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Spotlight, ApiError | AxiosError>(
    ['spotlights', id],
    () => getSpotlight(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type SpotlightList = PaginatedList<'spotlights', Spotlight>;

export interface GetSpotlightsQuery extends ListRequestQuery {
  tags?: string[] | string;
  club?: string;
  league?: string;
}

export async function getSpotlights(
  api: ApiContext,
  query?: GetSpotlightsQuery,
): Promise<SpotlightList> {
  const { data } = await api.get<SpotlightList>('/spotlights', query);
  return data;
}

export function useSpotlights(
  query?: GetSpotlightsQuery,
  options?: Omit<UseQueryOptions<SpotlightList, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<SpotlightList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<SpotlightList, ApiError | AxiosError>(
    ['spotlights', query],
    () => getSpotlights(api, query),
    options,
  );
}

export interface SpotlightBody {
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

export async function postSpotlight(api: ApiContext, body: SpotlightBody): Promise<Spotlight> {
  const { data } = await api.post<Spotlight, SpotlightBody>('/spotlights', body);
  return data;
}

export function usePostSpotlight(
  options?: Omit<UseMutationOptions<Spotlight, ApiError | AxiosError, SpotlightBody>, 'mutationFn'>,
): UseMutationResult<Spotlight, ApiError | AxiosError, SpotlightBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Spotlight, ApiError | AxiosError, SpotlightBody>(
    (body: SpotlightBody) => postSpotlight(api, body),
    {
      onSuccess(spotlight: Spotlight) {
        queryClient.setQueryData(['spotlights', spotlight.id], spotlight);
      },
      ...options,
    },
  );
}

export async function putSpotlight(
  api: ApiContext,
  id: string,
  body: SpotlightBody,
): Promise<Spotlight> {
  const { data } = await api.put<Spotlight, SpotlightBody>(`/spotlights/${id}`, body);
  return data;
}

export type PutSpotlightVariables = SpotlightBody & { id: string };

export function usePutSpotlight(
  options?: Omit<
    UseMutationOptions<Spotlight, ApiError | AxiosError, PutSpotlightVariables>,
    'mutationFn'
  >,
): UseMutationResult<Spotlight, ApiError | AxiosError, PutSpotlightVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Spotlight, ApiError | AxiosError, PutSpotlightVariables>(
    ({ id, ...body }: PutSpotlightVariables) => putSpotlight(api, id, body),
    {
      onSuccess(spotlight: Spotlight) {
        queryClient.setQueryData(['spotlights', spotlight.id], spotlight);
      },
      ...options,
    },
  );
}

export interface PostSpotlightIllustrationBody {
  illustration: File;
}

export async function postSpotlightIllustration(
  api: ApiContext,
  id: string,
  body: PostSpotlightIllustrationBody,
): Promise<Spotlight> {
  const { data } = await api.post<Spotlight>(`/spotlights/${id}/illustration`, body);
  return data;
}

export type PostSpotlightIllustrationVariables = PostSpotlightIllustrationBody & { id: string };

export function usePostSpotlightIllustration(
  options?: Omit<
    UseMutationOptions<Spotlight, ApiError | AxiosError, PostSpotlightIllustrationBody>,
    'mutationFn'
  >,
): UseMutationResult<Spotlight, ApiError | AxiosError, PostSpotlightIllustrationVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Spotlight, ApiError | AxiosError, PostSpotlightIllustrationVariables>(
    ({ id, ...body }: PostSpotlightIllustrationVariables) =>
      postSpotlightIllustration(api, id, body),
    {
      onSuccess(spotlight: Spotlight) {
        queryClient.setQueryData(['spotlights', spotlight.id], spotlight);
      },
      ...options,
    },
  );
}
