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
import {
  ApiContext,
  ApiError,
  ListRequestQuery,
  PaginatedList,
  RequestBody,
  useApi,
} from '../../api';
import { Ticket } from './model';

export async function getTicket(api: ApiContext, id: string): Promise<Ticket> {
  const { data } = await api.get<Ticket>(`/tickets/${id}`);
  return data;
}

export function useTicket(
  id?: string,
  options?: Omit<UseQueryOptions<Ticket, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Ticket, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Ticket, ApiError | AxiosError>(
    ['tickets', id],
    () => getTicket(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type TicketList = PaginatedList<'tickets', Ticket>;

export interface GetTicketsQuery extends ListRequestQuery {
  wallet?: string;
  source?: string;
}

export async function getTickets(api: ApiContext, query?: GetTicketsQuery): Promise<TicketList> {
  const { data } = await api.get<TicketList>('/tickets', query);
  return data;
}

export function useTickets(
  query?: GetTicketsQuery,
  options?: Omit<UseQueryOptions<TicketList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<TicketList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<TicketList, ApiError | AxiosError>(
    ['tickets', query],
    () => getTickets(api, query),
    options,
  );
}

export interface PostTicketBody extends RequestBody {
  wallet?: string | null;
}

export async function postTicket(api: ApiContext, body: PostTicketBody): Promise<Ticket> {
  const { data } = await api.post<Ticket, PostTicketBody>('/tickets', body);
  return data;
}

export function usePostTicket(
  options?: Omit<UseMutationOptions<Ticket, ApiError | AxiosError, PostTicketBody>, 'mutationFn'>,
): UseMutationResult<Ticket, ApiError | AxiosError, PostTicketBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Ticket, ApiError | AxiosError, PostTicketBody>(
    (body: PostTicketBody) => postTicket(api, body),
    {
      onSuccess(ticket: Ticket) {
        queryClient.setQueryData(['tickets', ticket.id], ticket);
      },
      ...options,
    },
  );
}

export interface PutTicketBody extends RequestBody {
  wallet?: string | null;
}

export async function putTicket(api: ApiContext, id: string, body: PutTicketBody): Promise<Ticket> {
  const { data } = await api.put<Ticket, PostTicketBody>(`/tickets/${id}`, body);
  return data;
}

export type PutTicketVariables = PutTicketBody & { id: string };

export function usePutTicket(
  options?: Omit<
    UseMutationOptions<Ticket, ApiError | AxiosError, PutTicketVariables>,
    'mutationFn'
  >,
): UseMutationResult<Ticket, ApiError | AxiosError, PutTicketVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Ticket, ApiError | AxiosError, PutTicketVariables>(
    ({ id, ...body }: PutTicketVariables) => putTicket(api, id, body),
    {
      onSuccess(ticket: Ticket) {
        queryClient.setQueryData(['tickets', ticket.id], ticket);
      },
      ...options,
    },
  );
}
