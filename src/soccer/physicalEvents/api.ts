import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useApi, RequestBody, PaginatedList, RequestQuery } from '../../api';
import PhysicalEvent, { PhysicalEventType } from './model';

export function usePhysicalEvent(id?: string): UseQueryResult<PhysicalEvent> {
  const api = useApi();
  return useQuery<PhysicalEvent>(['physical_events', id], async () => {
    const { data } = await api.get<PhysicalEvent>(`/physical_events/${id}`);
    return data;
  });
}

export interface GetPhysicalEventsQuery extends RequestQuery {
  match?: string;
  composition?: string;
  wallet?: string;
}

export type PhysicalEventList = PaginatedList<'physical_events', PhysicalEvent>;

export function usePhysicalEvents(
  query?: GetPhysicalEventsQuery,
): UseQueryResult<PhysicalEventList> {
  const api = useApi();
  return useQuery<PhysicalEventList>(['physical_events', query], async () => {
    const { data } = await api.get<PhysicalEventList>('/physical_events', query);
    return data;
  });
}

export interface PhysicalEventBody extends RequestBody {
  type?: PhysicalEventType;
  name?: string | null;
  description?: string | null;
  beginning?: string | null;
  end?: string | null;
  parent_event?: string | null;
}

export function usePostPhysicalEvent(): UseMutationResult<
  PhysicalEvent,
  unknown,
  PhysicalEventBody
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PhysicalEvent, unknown, PhysicalEventBody>(
    async (body: PhysicalEventBody) => {
      const { data } = await api.post<PhysicalEvent>('/physical_events', body);
      return data;
    },
    {
      onSuccess(physicalEvent: PhysicalEvent) {
        queryClient.setQueryData(['physical_events', physicalEvent.id], physicalEvent);
      },
    },
  );
}

export type PutPhysicalEventVariables = PhysicalEventBody & { id: string };

export function usePutPhysicalEvent(): UseMutationResult<
  PhysicalEvent,
  unknown,
  PutPhysicalEventVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PhysicalEvent, unknown, PutPhysicalEventVariables>(
    async ({ id, ...body }: PutPhysicalEventVariables) => {
      const { data } = await api.put<PhysicalEvent>(`/physical_events/${id}`, body);
      return data;
    },
    {
      onSuccess(physicalEvent: PhysicalEvent) {
        queryClient.setQueryData(['physical_events', physicalEvent.id], physicalEvent);
      },
    },
  );
}

export type AddPhysicalEventPictureBody = { icon: File };

export type AddPhysicalEventPictureVariables = AddPhysicalEventPictureBody & { id: string };

export function useAddPhysicalEventPicture(): UseMutationResult<
  PhysicalEvent,
  unknown,
  AddPhysicalEventPictureVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PhysicalEvent, unknown, AddPhysicalEventPictureVariables>(
    async ({ id, icon }: AddPhysicalEventPictureVariables) => {
      const { data } = await api.post<PhysicalEvent>(`/physical_events/${id}/picture`, { icon });
      return data;
    },
    {
      onSuccess(physicalEvent: PhysicalEvent) {
        queryClient.setQueryData(['physical_events', physicalEvent.id], physicalEvent);
      },
    },
  );
}
