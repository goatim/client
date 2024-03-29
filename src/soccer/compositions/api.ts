import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  ApiContext,
  ApiError,
  ListRequestQuery,
  PaginatedList,
  RequestQuery,
  useApi,
} from '../../api';
import { useActiveWallet } from '../../market';
import { Composition, CompositionStatus } from './model';

export type GetCompositionQuery = RequestQuery;

export async function getComposition(
  api: ApiContext,
  id: string,
  query?: GetCompositionQuery,
): Promise<Composition> {
  const { data } = await api.get<Composition>(`/compositions/${id}`, query);
  return data;
}

export function useComposition(
  id?: string,
  query?: GetCompositionQuery,
  options?: Omit<UseQueryOptions<Composition, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<Composition> {
  const api = useApi();

  return useQuery<Composition, ApiError | AxiosError>(
    ['compositions', id, query],
    () => getComposition(api, id as string, query),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export interface GetCompositionsQuery extends ListRequestQuery {
  match?: string;
  wallet?: string;
  status?: CompositionStatus;
}

export type CompositionList = PaginatedList<'compositions', Composition>;

export function mergeCompositionInList(
  composition: Composition,
  compositionList?: CompositionList,
): CompositionList {
  if (!compositionList?.compositions.length) {
    return {
      ...compositionList,
      total: compositionList?.total || 1,
      compositions: [composition],
    };
  }

  const index = compositionList.compositions.findIndex(({ id }) => id === composition.id);

  if (index === -1) {
    return {
      ...compositionList,
      total: (compositionList.total || 0) + 1,
      compositions: compositionList.compositions
        ? [composition, ...compositionList.compositions]
        : [composition],
    };
  }

  compositionList.compositions[index] = composition;

  return compositionList;
}

export function removeCompositionFromList(
  id: string,
  compositionList?: CompositionList,
): CompositionList {
  if (!compositionList?.compositions.length) {
    return {
      ...compositionList,
      total: 0,
      compositions: [],
    };
  }

  const index = compositionList.compositions.findIndex((composition) => id === composition.id);

  if (index === -1) {
    return compositionList;
  }

  compositionList.compositions.splice(index, 1);
  if (compositionList.total) {
    compositionList.total -= 1;
  }

  return compositionList;
}

export async function getCompositions(
  api: ApiContext,
  query?: GetCompositionsQuery,
): Promise<CompositionList> {
  const { data } = await api.get<CompositionList>('/compositions', query);
  return data;
}

export function useCompositions(
  query?: GetCompositionsQuery,
  options?: Omit<UseQueryOptions<CompositionList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<CompositionList> {
  const api = useApi();
  return useQuery<CompositionList, ApiError | AxiosError>(
    ['compositions', query],
    () => getCompositions(api, query),
    options,
  );
}

export function useActiveWalletCompositions(
  query?: GetCompositionsQuery,
  options?: Omit<UseQueryOptions<CompositionList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<CompositionList> {
  const api = useApi();
  const wallet = useActiveWallet();

  return useQuery<CompositionList, ApiError | AxiosError>(
    ['compositions', { wallet: wallet.data?.id, ...query }],
    () => getCompositions(api, { wallet: wallet.data?.id, ...query }),
    {
      ...options,
      enabled:
        options?.enabled !== undefined ? options.enabled && !!wallet.data?.id : !!wallet.data?.id,
    },
  );
}

export interface CompositionPositionBody {
  id: string;
  player: string | null;
  booster_factory: string | null;
}

export interface CompositionBody {
  match?: string | null;
  wallet?: string | null;
  setting?: string | null;
  positions?: CompositionPositionBody[] | string | null;
  status?: CompositionStatus;
}

export async function postComposition(
  api: ApiContext,
  body: CompositionBody,
  query?: RequestQuery,
): Promise<Composition> {
  if (body.positions && Array.isArray(body.positions)) {
    body.positions = JSON.stringify(body.positions);
  }
  const { data } = await api.post<Composition, CompositionBody>('/compositions', body, query);
  return data;
}

export function usePostComposition(
  query?: RequestQuery,
  options?: Omit<
    UseMutationOptions<Composition, ApiError | AxiosError, CompositionBody>,
    'mutationFn'
  >,
): UseMutationResult<Composition, ApiError | AxiosError, CompositionBody> {
  const api = useApi();
  return useMutation<Composition, ApiError | AxiosError, CompositionBody>(
    (body: CompositionBody) => postComposition(api, body, query),
    options,
  );
}

export function usePostActiveWalletComposition(
  query?: Omit<GetCompositionsQuery, 'wallet'>,
  options?: Omit<
    UseMutationOptions<Composition, ApiError | AxiosError, CompositionBody>,
    'mutationFn'
  >,
): UseMutationResult<Composition, ApiError | AxiosError, CompositionBody> {
  const api = useApi();
  const wallet = useActiveWallet();

  return useMutation<Composition, ApiError | AxiosError, CompositionBody>(
    (body: CompositionBody) => postComposition(api, { wallet: wallet.data?.id, ...body }, query),
    options,
  );
}

export async function putComposition(
  api: ApiContext,
  id: string,
  body: CompositionBody,
  query?: RequestQuery,
): Promise<Composition> {
  const { data } = await api.put<Composition, CompositionBody>(`/compositions/${id}`, body, query);
  return data;
}

export type UsePutCompositionVariables = CompositionBody & { id: string };

export function usePutComposition(
  query?: RequestQuery,
  options?: Omit<
    UseMutationOptions<Composition, ApiError | AxiosError, UsePutCompositionVariables>,
    'mutationFn'
  >,
): UseMutationResult<Composition, ApiError | AxiosError, UsePutCompositionVariables> {
  const api = useApi();
  return useMutation<Composition, ApiError | AxiosError, UsePutCompositionVariables>(
    ({ id, ...body }: UsePutCompositionVariables) => putComposition(api, id, body, query),
    options,
  );
}

export async function deleteComposition(api: ApiContext, id: string): Promise<void> {
  await api.delete<void>(`/compositions/${id}`);
}

export function useDeleteComposition(
  options?: Omit<UseMutationOptions<void, ApiError | AxiosError, string>, 'mutationFn'>,
): UseMutationResult<void, ApiError | AxiosError, string> {
  const api = useApi();
  return useMutation<void, ApiError | AxiosError, string>(
    (id) => deleteComposition(api, id),
    options,
  );
}
