import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useApi, PaginatedList, ListRequestQuery } from '../../api';
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

export interface GetPacksQuery extends ListRequestQuery {
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

export interface PostPackBody {
  wallet?: string | null;
  share_bulks?: string | null;
  tags?: string | null;
  seen?: boolean;
  title?: string | null;
  message?: string | null;
}

export function usePostPack(): UseMutationResult<Pack, unknown, PostPackBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Pack, unknown, PostPackBody>(
    async (body: PostPackBody) => {
      const { data } = await api.post<Pack, PostPackBody>('/packs', body);
      return data;
    },
    {
      onSuccess(pack: Pack) {
        queryClient.setQueryData(['packs', pack.id], pack);
      },
    },
  );
}

export interface PutPackBody {
  seen?: boolean;
  title?: string | null;
  message?: string | null;
}

export type PutPackVariables = PutPackBody & { id: string };

export function usePutPack(): UseMutationResult<Pack, unknown, PutPackVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Pack, unknown, PutPackVariables>(
    async ({ id, ...body }: PutPackVariables) => {
      const { data } = await api.put<Pack, PostPackBody>(`/packs/${id}`, body);
      return data;
    },
    {
      onSuccess(pack: Pack) {
        queryClient.setQueryData(['packs', pack.id], pack);
      },
    },
  );
}
