import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { AxiosError } from 'axios';
import {
  ApiContext,
  ApiError,
  ListRequestQuery,
  PaginatedList,
  RequestBody,
  useApi,
} from '../../api';
import { PhysicalEvent, PhysicalEventType } from './model';

export async function getPhysicalEvent(api: ApiContext, id: string): Promise<PhysicalEvent> {
  const { data } = await api.get<PhysicalEvent>(`/physical_events/${id}`);
  return data;
}

export function usePhysicalEvent(
  id?: string,
  options?: Omit<UseQueryOptions<PhysicalEvent, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<PhysicalEvent, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<PhysicalEvent, ApiError | AxiosError>(
    ['physical_events', id],
    () => getPhysicalEvent(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export interface GetPhysicalEventsQuery extends ListRequestQuery {
  match?: string;
  composition?: string;
  wallet?: string;
}

export type PhysicalEventList = PaginatedList<'physical_events', PhysicalEvent>;

export async function getPhysicalEvents(
  api: ApiContext,
  query?: GetPhysicalEventsQuery,
): Promise<PhysicalEventList> {
  const { data } = await api.get<PhysicalEventList>('/physical_events', query);
  return data;
}

export function usePhysicalEvents(
  query?: GetPhysicalEventsQuery,
  options?: Omit<UseQueryOptions<PhysicalEventList, ApiError | AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<PhysicalEventList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<PhysicalEventList, ApiError | AxiosError>(
    ['physical_events', query],
    () => getPhysicalEvents(api, query),
    options,
  );
}

export interface PhysicalEventBody extends RequestBody {
  type?: PhysicalEventType;
  name?: string | null;
  description?: string | null;
  beginning?: string | null;
  end?: string | null;
  parent_event?: string | null;
}

export async function postPhysicalEvent(
  api: ApiContext,
  body: PhysicalEventBody,
): Promise<PhysicalEvent> {
  const { data } = await api.post<PhysicalEvent, PhysicalEventBody>('/physical_events', body);
  return data;
}

export function usePostPhysicalEvent(
  options?: Omit<
    UseMutationOptions<PhysicalEvent, ApiError | AxiosError, PhysicalEventBody>,
    'mutationFn'
  >,
): UseMutationResult<PhysicalEvent, ApiError | AxiosError, PhysicalEventBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PhysicalEvent, ApiError | AxiosError, PhysicalEventBody>(
    (body: PhysicalEventBody) => postPhysicalEvent(api, body),
    {
      onSuccess(physicalEvent: PhysicalEvent) {
        queryClient.setQueryData(['physical_events', physicalEvent.id], physicalEvent);
      },
      ...options,
    },
  );
}

export async function putPhysicalEvent(
  api: ApiContext,
  id: string,
  body: PhysicalEventBody,
): Promise<PhysicalEvent> {
  const { data } = await api.put<PhysicalEvent, PhysicalEventBody>(`/physical_events/${id}`, body);
  return data;
}

export type PutPhysicalEventVariables = PhysicalEventBody & { id: string };

export function usePutPhysicalEvent(
  options?: Omit<
    UseMutationOptions<PhysicalEvent, ApiError | AxiosError, PutPhysicalEventVariables>,
    'mutationFn'
  >,
): UseMutationResult<PhysicalEvent, ApiError | AxiosError, PutPhysicalEventVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PhysicalEvent, ApiError | AxiosError, PutPhysicalEventVariables>(
    ({ id, ...body }: PutPhysicalEventVariables) => putPhysicalEvent(api, id, body),
    {
      onSuccess(physicalEvent: PhysicalEvent) {
        queryClient.setQueryData(['physical_events', physicalEvent.id], physicalEvent);
      },
      ...options,
    },
  );
}

export interface PostPhysicalEventIconBody extends RequestBody {
  icon: File;
}

export async function postPhysicalEventIcon(
  api: ApiContext,
  id: string,
  body: PostPhysicalEventIconBody,
): Promise<PhysicalEvent> {
  const { data } = await api.post<PhysicalEvent>(`/physical_events/${id}/picture`, body);
  return data;
}

export type PostPhysicalEventIconVariables = PostPhysicalEventIconBody & { id: string };

export function useAddPhysicalEventPicture(
  options?: Omit<
    UseMutationOptions<PhysicalEvent, ApiError | AxiosError, PostPhysicalEventIconVariables>,
    'mutationFn'
  >,
): UseMutationResult<PhysicalEvent, ApiError | AxiosError, PostPhysicalEventIconVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PhysicalEvent, ApiError | AxiosError, PostPhysicalEventIconVariables>(
    ({ id, ...body }: PostPhysicalEventIconVariables) => postPhysicalEventIcon(api, id, body),
    {
      onSuccess(physicalEvent: PhysicalEvent) {
        queryClient.setQueryData(['physical_events', physicalEvent.id], physicalEvent);
      },
      ...options,
    },
  );
}
