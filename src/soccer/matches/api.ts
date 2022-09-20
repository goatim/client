import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PaginatedList, RequestBody, RequestQuery, useApi } from '../../api';
import Match, { MatchStatus } from './model';

export function useMatch(id?: string): UseQueryResult<Match> {
  const api = useApi();
  return useQuery(['matches', id], async () => {
    const { data } = await api.get<Match>(`/matches/${id}`);
    return data;
  });
}

export function useMatchLiveStatus(
  beginning?: DateTime | string,
  end?: DateTime | string,
  initialStatus?: MatchStatus,
): MatchStatus | undefined {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const resolvedBeginning = useMemo<DateTime | undefined>(
    () => (typeof beginning === 'string' ? DateTime.fromISO(beginning) : beginning),
    [beginning],
  );

  const resolvedEnd = useMemo<DateTime | undefined>(
    () => (typeof end === 'string' ? DateTime.fromISO(end) : end),
    [end],
  );

  const [liveStatus, setLiveStatus] = useState<MatchStatus | undefined>(initialStatus);

  const resolveStatus = useCallback(() => {
    if (initialStatus === 'cancelled') {
      return;
    }
    if (resolvedBeginning && DateTime.now() < resolvedBeginning) {
      setLiveStatus('planned');
    } else if (resolvedEnd && DateTime.now() < resolvedEnd) {
      setLiveStatus('ongoing');
    } else {
      setLiveStatus('passed');
    }
    timeout.current = setTimeout(resolveStatus, 1000);
  }, [initialStatus, resolvedEnd, resolvedBeginning]);

  useEffect(() => {
    resolveStatus();
    return () => (timeout.current ? clearTimeout(timeout.current) : undefined);
  }, [resolveStatus]);

  return liveStatus;
}

export type MatchList = PaginatedList<'matches', Match>;

export interface GetMatchesQuery extends RequestQuery {
  spotlight?: boolean;
}

export function useMatches(
  query?: GetMatchesQuery,
  options?: UseQueryOptions<MatchList>,
): UseQueryResult<MatchList> {
  const api = useApi();
  return useQuery<MatchList>(
    ['matches', query],
    async () => {
      const { data } = await api.get<MatchList>('/matches', query);
      return data;
    },
    options,
  );
}

export function useSpotlightMatches(): UseQueryResult<MatchList> {
  return useMatches({ spotlight: true });
}

export interface MatchBody extends RequestBody {
  title?: string | null;
  description?: string | null;
  beginning?: string | null;
  end?: string | null;
  is_public?: boolean;
  status?: string | null;
}

export function useCreateMatch(): UseMutationResult<Match, unknown, MatchBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Match, unknown, MatchBody>(
    async (body: MatchBody) => {
      const { data } = await api.post<Match>('/matches', body);
      return data;
    },
    {
      onSuccess(match: Match) {
        queryClient.setQueryData(['matches', match.id], match);
      },
    },
  );
}

export type UpdateMatchVariables = MatchBody & { id: string };

export function useUpdateMatch(): UseMutationResult<Match, unknown, UpdateMatchVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Match, unknown, UpdateMatchVariables>(
    async ({ id, ...body }: UpdateMatchVariables) => {
      const { data } = await api.put<Match>(`/matches/${id}`, body);
      return data;
    },
    {
      onSuccess(match: Match) {
        queryClient.setQueryData(['matches', match.id], match);
      },
    },
  );
}

export type AddMatchPictureBody = { icon: File };

export type AddMatchPictureVariables = AddMatchPictureBody & { id: string };

export function useAddMatchIcon(): UseMutationResult<Match, unknown, AddMatchPictureVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Match, unknown, AddMatchPictureVariables>(
    async ({ id, icon }: AddMatchPictureVariables) => {
      const { data } = await api.post<Match>(`/matches/${id}/icon`, { icon });
      return data;
    },
    {
      onSuccess(match: Match) {
        queryClient.setQueryData(['matches', match.id], match);
      },
    },
  );
}
