import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useApi, PaginatedList, ListRequestQuery, RequestBody } from '../../api';
import PackFactory from './model';

export function usePackFactory(id?: string): UseQueryResult<PackFactory> {
  const api = useApi();
  return useQuery<PackFactory>(
    ['pack_factories', id],
    async () => {
      const { data } = await api.get<PackFactory>(`/pack_factories/${id}`);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export type PackFactoryList = PaginatedList<'pack_factories', PackFactory>;

export interface GetPackFactoriesQuery extends ListRequestQuery {
  tags?: string[] | string;
  stock_tags?: string[] | string;
  margin?: string[] | string;
}

export function usePackFactories(query?: GetPackFactoriesQuery): UseQueryResult<PackFactoryList> {
  const api = useApi();
  return useQuery<PackFactoryList>(['pack_factories', query], async () => {
    const { data } = await api.get<PackFactoryList>('/pack_factories', query);
    return data;
  });
}

export interface PackFactoryBody extends RequestBody {
  name?: string | null;
  description?: string | null;
  tags?: string | null;
  stock_tags?: string | null;
  odds?: string | null;
  breakdown?: string | null;
  margin?: number;
  title?: string;
  message?: string;
}

export function usePostPackFactory(): UseMutationResult<PackFactory, unknown, PackFactoryBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PackFactory, unknown, PackFactoryBody>(
    async (body: PackFactoryBody) => {
      const { data } = await api.post<PackFactory, PackFactoryBody>('/pack_factories', body);
      return data;
    },
    {
      onSuccess(packFactory: PackFactory) {
        queryClient.setQueryData(['pack_factories', packFactory.id], packFactory);
      },
    },
  );
}

export type PutPackFactoryVariables = PackFactoryBody & { id: string };

export function usePutPackFactory(): UseMutationResult<
  PackFactory,
  unknown,
  PutPackFactoryVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PackFactory, unknown, PutPackFactoryVariables>(
    async ({ id, ...body }: PutPackFactoryVariables) => {
      const { data } = await api.put<PackFactory, PackFactoryBody>(`/pack_factories/${id}`, body);
      return data;
    },
    {
      onSuccess(packFactory: PackFactory) {
        queryClient.setQueryData(['pack_factories', packFactory.id], packFactory);
      },
    },
  );
}

export type AddPackFactoryPictureBody = { icon: File };

export type AddPackFactoryPictureVariables = AddPackFactoryPictureBody & { id: string };

export function useAddPackFactoryIcon(): UseMutationResult<
  PackFactory,
  unknown,
  AddPackFactoryPictureVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PackFactory, unknown, AddPackFactoryPictureVariables>(
    async ({ id, icon }: AddPackFactoryPictureVariables) => {
      const { data } = await api.post<PackFactory>(`/pack_factories/${id}/icon`, { icon });
      return data;
    },
    {
      onSuccess(packFactory: PackFactory) {
        queryClient.setQueryData(['pack_factories', packFactory.id], packFactory);
      },
    },
  );
}
