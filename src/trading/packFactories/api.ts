import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useApi, PaginatedList, RequestParams, RequestBody } from '../../api';
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

export interface GetPackFactoriesParams extends RequestParams {
  tags?: string[] | string;
  stock_tags?: string[] | string;
  margin?: string[] | string;
}

export function usePackFactories(params?: GetPackFactoriesParams): UseQueryResult<PackFactoryList> {
  const api = useApi();
  return useQuery<PackFactoryList>(['pack_factories', params], async () => {
    const { data } = await api.get<PackFactoryList>('/pack_factories', params);
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
}

export function useCreatePackFactory(): UseMutationResult<PackFactory, unknown, PackFactoryBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PackFactory, unknown, PackFactoryBody>(
    async (body: PackFactoryBody) => {
      const { data } = await api.post<PackFactory>('/pack_factories', body);
      return data;
    },
    {
      onSuccess(packFactory: PackFactory) {
        queryClient.setQueryData(['pack_factories', packFactory.id], packFactory);
      },
    },
  );
}

export type UpdatePackFactoryVariables = PackFactoryBody & { id: string };

export function useUpdatePackFactory(): UseMutationResult<
  PackFactory,
  unknown,
  UpdatePackFactoryVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PackFactory, unknown, UpdatePackFactoryVariables>(
    async ({ id, ...body }: UpdatePackFactoryVariables) => {
      const { data } = await api.put<PackFactory>(`/pack_factories/${id}`, body);
      return data;
    },
    {
      onSuccess(packFactory: PackFactory) {
        queryClient.setQueryData(['pack_factories', packFactory.id], packFactory);
      },
    },
  );
}
