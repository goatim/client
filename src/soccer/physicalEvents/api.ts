import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { useApi, RequestBody, PaginatedList } from '../../api';
import PhysicalEvent, { PhysicalEventType } from './model';

export function usePhysicalEvent(id?: string): UseQueryResult<PhysicalEvent> {
  const api = useApi();
  return useQuery<PhysicalEvent>(['physical_events', id], async () => {
    const { data } = await api.get<PhysicalEvent>(`/physical_events/${id}`);
    return data;
  });
}

export type PhysicalEventList = PaginatedList<'physical_events', PhysicalEvent>;

export function usePhysicalEvents(): UseQueryResult<PhysicalEventList> {
  const api = useApi();
  return useQuery<PhysicalEventList>('physical_events', async () => {
    const { data } = await api.get<PhysicalEventList>('/physical_events');
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

export function useCreatePhysicalEvent(): UseMutationResult<
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

export type UpdatePhysicalEventVariables = PhysicalEventBody & { id: string };

export function useUpdatePhysicalEvent(): UseMutationResult<
  PhysicalEvent,
  unknown,
  UpdatePhysicalEventVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<PhysicalEvent, unknown, UpdatePhysicalEventVariables>(
    async ({ id, ...body }: UpdatePhysicalEventVariables) => {
      const { data } = await api.put<PhysicalEvent>(`/physical_events/${body}`, body);
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
