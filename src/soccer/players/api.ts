import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { AxiosResponse } from 'axios';
import { ApiContext, ListRequestQuery, PaginatedList, RequestBody, useApi } from '../../api';
import Player, { PlayerPosition } from './model';

export function usePlayer(id?: string): UseQueryResult<Player> {
  const api = useApi();
  return useQuery<Player>(
    ['players', id],
    async () => {
      const { data } = await api.get<Player>(`/players/${id}`);
      return data;
    },
    {
      enabled: !!id,
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

export function usePlayers(query?: GetPlayersQuery): UseQueryResult<PlayerList> {
  const api = useApi();
  return useQuery<PlayerList>(['players', query], async () => {
    const { data } = await api.get<PlayerList, GetPlayersQuery>('/players', query);
    return data;
  });
}

export async function getPlayers(
  api: ApiContext,
  {
    club,
    league,
    wallet = 'default',
    match,
    composition,
    position,
    search,
    expand = 'club',
  }: GetPlayersQuery,
): Promise<AxiosResponse<PlayerList>> {
  return api.get<PlayerList, GetPlayersQuery>('/players', {
    club,
    league,
    wallet,
    match,
    composition,
    position,
    search,
    expand,
  });
}

export interface PlayerBody extends RequestBody {
  first_name?: string | null;
  last_name?: string | null;
  description?: string | null;
  club?: string | null;
  position?: string | null;
  side?: string | null;
  number?: number;
}

export function usePostPlayer(): UseMutationResult<Player, unknown, PlayerBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Player, unknown, PlayerBody>(
    async (body: PlayerBody) => {
      const { data } = await api.post<Player, PlayerBody>('/players', body);
      return data;
    },
    {
      onSuccess(player: Player) {
        queryClient.setQueryData(['players', player.id], player);
      },
    },
  );
}

export type PutPlayerVariables = PlayerBody & { id: string };

export function usePutPlayer(): UseMutationResult<Player, unknown, PutPlayerVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Player, unknown, PutPlayerVariables>(
    async ({ id, ...body }: PutPlayerVariables) => {
      const { data } = await api.put<Player, PlayerBody>(`/players/${id}`, body);
      return data;
    },
    {
      onSuccess(player: Player) {
        queryClient.setQueryData(['players', player.id], player);
      },
    },
  );
}

export type AddPlayerPictureBody = { illustration: File };

export type AddPlayerPictureVariables = AddPlayerPictureBody & { id: string };

export function useAddPlayerIllustration(): UseMutationResult<
  Player,
  unknown,
  AddPlayerPictureVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Player, unknown, AddPlayerPictureVariables>(
    async ({ id, illustration }: AddPlayerPictureVariables) => {
      const { data } = await api.post<Player>(`/players/${id}/illustration`, { illustration });
      return data;
    },
    {
      onSuccess(player: Player) {
        queryClient.setQueryData(['players', player.id], player);
      },
    },
  );
}

export interface PostPlayerBulkBody extends RequestBody {
  bulk: File;
}

export type PostPlayerBulkResponse = { created: number };

export function usePostPlayerBulk(): UseMutationResult<
  PostPlayerBulkResponse,
  unknown,
  PostPlayerBulkBody
> {
  const api = useApi();
  return useMutation<PostPlayerBulkResponse, unknown, PostPlayerBulkBody>(
    async (body: PostPlayerBulkBody) => {
      const { data } = await api.post<PostPlayerBulkResponse, PostPlayerBulkBody>(
        '/players/bulk',
        body,
      );
      return data;
    },
  );
}
