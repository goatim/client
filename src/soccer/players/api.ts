import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { AxiosResponse } from 'axios';
import { ApiContext, PaginatedList, RequestBody, RequestParams, useApi } from '../../api';
import Player from './model';

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

export interface GetPlayersParams extends RequestParams {
  wallet?: string;
  composition_setting?: string;
  match?: string;
  composition?: string;
  position?: string;
  search?: string;
}

export function usePlayers(params?: GetPlayersParams): UseQueryResult<PlayerList> {
  const api = useApi();
  return useQuery<PlayerList>(['players', params], async () => {
    const { data } = await api.get<PlayerList>('/players', params);
    return data;
  });
}

export async function getPlayers(
  api: ApiContext,
  {
    wallet = 'default',
    expand = 'club',
    composition_setting,
    match,
    composition,
    position,
  }: GetPlayersParams,
): Promise<AxiosResponse<PlayerList>> {
  return api.get<PlayerList>('/players', {
    wallet,
    composition_setting,
    match,
    composition,
    position,
    expand,
  });
}

export interface PlayerBody extends RequestBody {
  name?: string | null;
  description?: string | null;
  club?: string | null;
  position?: string | null;
  side?: string | null;
  number?: number;
}

export function useCreatePlayer(): UseMutationResult<Player, unknown, PlayerBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Player, unknown, PlayerBody>(
    async (body: PlayerBody) => {
      const { data } = await api.post<Player>('/players', body);
      return data;
    },
    {
      onSuccess(player: Player) {
        queryClient.setQueryData(['players', player.id], player);
      },
    },
  );
}

export type UpdatePlayerVariables = PlayerBody & { id: string };

export function useUpdatePlayer(): UseMutationResult<Player, unknown, UpdatePlayerVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Player, unknown, UpdatePlayerVariables>(
    async ({ id, ...body }: UpdatePlayerVariables) => {
      const { data } = await api.put<Player>(`/players/${body}`, body);
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
      const { data } = await api.post<PostPlayerBulkResponse>('/players/bulk', body);
      return data;
    },
  );
}
