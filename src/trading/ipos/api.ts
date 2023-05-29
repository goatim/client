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
import { Ipo, IpoType } from './model';

export async function getIpo(api: ApiContext, id: string): Promise<Ipo> {
  const { data } = await api.get<Ipo>(`/ipos/${id}`);
  return data;
}

export function useIpo(
  id?: string,
  options?: Omit<UseQueryOptions<Ipo, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Ipo, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Ipo, ApiError | AxiosError>(['ipos', id], () => getIpo(api, id as string), {
    ...options,
    enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
  });
}

export type IpoList = PaginatedList<'ipos', Ipo>;

export interface GetIposQuery extends ListRequestQuery {
  asset?: string;
}

export async function getIpos(api: ApiContext, query?: GetIposQuery): Promise<IpoList> {
  const { data } = await api.get<IpoList>('/ipos', query);
  return data;
}

export function useIpos(
  query?: GetIposQuery,
  options?: Omit<UseQueryOptions<IpoList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<IpoList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<IpoList, ApiError | AxiosError>(
    ['ipos', query],
    () => getIpos(api, query),
    options,
  );
}

export interface IpoBody {
  asset?: string | null;
  stocks_tags?: string | null;
  type?: IpoType | null;
  beginning?: string | null;
  end?: string | null;
  price?: number | null;
  title?: string | null;
  description?: string | null;
}

export async function postIpo(api: ApiContext, body: IpoBody): Promise<Ipo> {
  const { data } = await api.post<Ipo, IpoBody>('/ipos', body);
  return data;
}

export function usePostIpo(
  options?: Omit<UseMutationOptions<Ipo, ApiError | AxiosError, IpoBody>, 'mutationFn'>,
): UseMutationResult<Ipo, ApiError | AxiosError, IpoBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Ipo, ApiError | AxiosError, IpoBody>((body: IpoBody) => postIpo(api, body), {
    onSuccess(ipo: Ipo) {
      queryClient.setQueryData(['ipos', ipo.id], ipo);
    },
    ...options,
  });
}

export async function putIpo(api: ApiContext, id: string, body: IpoBody): Promise<Ipo> {
  const { data } = await api.put<Ipo, IpoBody>(`/ipos/${id}`, body);
  return data;
}

export type PutIpoVariables = IpoBody & { id: string };

export function usePutIpo(
  options?: Omit<UseMutationOptions<Ipo, ApiError | AxiosError, PutIpoVariables>, 'mutationFn'>,
): UseMutationResult<Ipo, ApiError | AxiosError, PutIpoVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Ipo, ApiError | AxiosError, PutIpoVariables>(
    ({ id, ...body }: PutIpoVariables) => putIpo(api, id, body),
    {
      onSuccess(ipo: Ipo) {
        queryClient.setQueryData(['ipos', ipo.id], ipo);
      },
      ...options,
    },
  );
}
