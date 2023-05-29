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
import { Player, PlayerPosition } from './model';

export async function getPlayer(api: ApiContext, id: string): Promise<Player> {
  const { data } = await api.get<Player>(`/players/${id}`);
  return data;
}

export function usePlayer(
  id?: string,
  options?: Omit<UseQueryOptions<Player, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Player, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Player, ApiError | AxiosError>(
    ['players', id],
    () => getPlayer(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type PlayerList = PaginatedList<'players', Player>;

export interface GetPlayersQuery extends ListRequestQuery {
  club?: string;
  league?: string;
  wallet?: string;
  match?: string;
  composition?: string;
  position?: PlayerPosition[] | PlayerPosition;
  search?: string;
}

export async function getPlayers(api: ApiContext, query?: GetPlayersQuery): Promise<PlayerList> {
  const { data } = await api.get<PlayerList, GetPlayersQuery>('/players', query);
  return data;
}

export function usePlayers(
  query?: GetPlayersQuery,
  options?: Omit<UseQueryOptions<PlayerList, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<PlayerList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<PlayerList, ApiError | AxiosError>(
    ['players', query],
    () => getPlayers(api, query),
    options,
  );
}

export interface PlayerBody {
  first_name?: string | null;
  last_name?: string | null;
  description?: string | null;
  club?: string | null;
  position?: string | null;
  side?: string | null;
  number?: number;
  performance_index?: number;
  tenure_rate?: number;
}

export async function postPlayer(api: ApiContext, body: PlayerBody): Promise<Player> {
  const { data } = await api.post<Player, PlayerBody>('/players', body);
  return data;
}

export function usePostPlayer(
  options?: Omit<UseMutationOptions<Player, ApiError | AxiosError, PlayerBody>, 'mutationFn'>,
): UseMutationResult<Player, ApiError | AxiosError, PlayerBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Player, ApiError | AxiosError, PlayerBody>(
    (body: PlayerBody) => postPlayer(api, body),
    {
      onSuccess(player: Player) {
        queryClient.setQueryData(['players', player.id], player);
      },
      ...options,
    },
  );
}

export async function putPlayer(api: ApiContext, id: string, body: PlayerBody): Promise<Player> {
  const { data } = await api.put<Player, PlayerBody>(`/players/${id}`, body);
  return data;
}

export type PutPlayerVariables = PlayerBody & { id: string };

export function usePutPlayer(
  options?: Omit<
    UseMutationOptions<Player, ApiError | AxiosError, PutPlayerVariables>,
    'mutationFn'
  >,
): UseMutationResult<Player, ApiError | AxiosError, PutPlayerVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Player, ApiError | AxiosError, PutPlayerVariables>(
    async ({ id, ...body }: PutPlayerVariables) => putPlayer(api, id, body),
    {
      onSuccess(player: Player) {
        queryClient.setQueryData(['players', player.id], player);
      },
      ...options,
    },
  );
}

export interface PostPlayerBulkBody {
  bulk: File;
}

export type PostPlayerBulkResponse = { created: number };

export async function postPlayerBulk(
  api: ApiContext,
  body: PostPlayerBulkBody,
): Promise<PostPlayerBulkResponse> {
  const { data } = await api.post<PostPlayerBulkResponse, PostPlayerBulkBody>(
    '/players/bulk',
    body,
  );
  return data;
}

export function usePostPlayerBulk(
  options?: Omit<
    UseMutationOptions<PostPlayerBulkResponse, ApiError | AxiosError, PostPlayerBulkBody>,
    'mutationFn'
  >,
): UseMutationResult<PostPlayerBulkResponse, ApiError | AxiosError, PostPlayerBulkBody> {
  const api = useApi();
  return useMutation<PostPlayerBulkResponse, ApiError | AxiosError, PostPlayerBulkBody>(
    (body: PostPlayerBulkBody) => postPlayerBulk(api, body),
    options,
  );
}
