import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { PaginatedList, RequestBody, RequestQuery, useApi } from '../../api';
import Ipo, { IpoType } from './model';

export function useIpo(
  ipoId?: string,
  query?: RequestQuery,
  initialData?: Ipo,
): UseQueryResult<Ipo> {
  const api = useApi();
  return useQuery<Ipo>(
    ['ipos', ipoId],
    async () => {
      const { data } = await api.get<Ipo>(`/ipos/${ipoId}`, query);
      return data;
    },
    { enabled: !!ipoId, initialData },
  );
}

export type IpoList = PaginatedList<'ipos', Ipo>;

export interface GetIposQuery extends RequestQuery {
  asset?: string;
}

export function useIpos(
  query?: GetIposQuery,
  options?: UseQueryOptions<IpoList>,
): UseQueryResult<IpoList> {
  const api = useApi();
  return useQuery<IpoList>(
    ['ipos', query],
    async () => {
      const { data } = await api.get<IpoList>('/ipos', query);
      return data;
    },
    options,
  );
}

export interface IpoBody extends RequestBody {
  asset?: string | null;
  stocks_tags?: string | null;
  type?: IpoType | null;
  beginning?: string | null;
  end?: string | null;
  price?: number | null;
  title?: string | null;
  description?: string | null;
}

export function usePostIpo(): UseMutationResult<Ipo, unknown, IpoBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Ipo, unknown, IpoBody>(
    async (body: IpoBody) => {
      const { data } = await api.post<Ipo>('/ipos', body);
      return data;
    },
    {
      onSuccess(ipo: Ipo) {
        queryClient.setQueryData(['ipos', ipo.id], ipo);
      },
    },
  );
}

export type PutIpoVariables = IpoBody & { id: string };

export function usePutIpo(): UseMutationResult<Ipo, unknown, PutIpoVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Ipo, unknown, PutIpoVariables>(
    async ({ id, ...body }: PutIpoVariables) => {
      const { data } = await api.put<Ipo>(`/ipos/${id}`, body);
      return data;
    },
    {
      onSuccess(ipo: Ipo) {
        queryClient.setQueryData(['ipos', ipo.id], ipo);
      },
    },
  );
}
