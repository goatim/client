import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useApi, PaginatedList, RequestQuery, RequestBody } from '../../api';
import Pack from './model';

export function usePack(id?: string): UseQueryResult<Pack> {
  const api = useApi();
  return useQuery<Pack>(
    ['packs', id],
    async () => {
      const { data } = await api.get<Pack>(`/packs/${id}`);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export type PackList = PaginatedList<'packs', Pack>;

export interface GetPacksQuery extends RequestQuery {
  seen?: boolean;
  wallet?: string;
  tags?: string[] | string;
  asset?: string;
}

export function usePacks(query?: GetPacksQuery): UseQueryResult<PackList> {
  const api = useApi();
  return useQuery<PackList>(['packs', query], async () => {
    const { data } = await api.get<PackList>('/packs', query);
    return data;
  });
}

export interface CreatePackBody extends RequestBody {
  wallet?: string | null;
  share_bulks?: string | null;
  tags?: string | null;
  seen?: boolean;
  title?: string | null;
  message?: string | null;
}

export function useCreatePack(): UseMutationResult<Pack, unknown, CreatePackBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Pack, unknown, CreatePackBody>(
    async (body: CreatePackBody) => {
      const { data } = await api.post<Pack>('/packs', body);
      return data;
    },
    {
      onSuccess(pack: Pack) {
        queryClient.setQueryData(['packs', pack.id], pack);
      },
    },
  );
}

export interface UpdatePackBody extends RequestBody {
  seen?: boolean;
  title?: string | null;
  message?: string | null;
}

export type UpdatePackVariables = UpdatePackBody & { id: string };

export function useUpdatePack(): UseMutationResult<Pack, unknown, UpdatePackVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Pack, unknown, UpdatePackVariables>(
    async ({ id, ...body }: UpdatePackVariables) => {
      const { data } = await api.put<Pack>(`/packs/${id}`, body);
      return data;
    },
    {
      onSuccess(pack: Pack) {
        queryClient.setQueryData(['packs', pack.id], pack);
      },
    },
  );
}
