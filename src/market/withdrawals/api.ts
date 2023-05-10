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
  RequestQuery,
  useApi,
} from '../../api';
import { Withdrawal } from './model';
import { useActiveWallet } from '../wallets';

export type GetWithdrawalQuery = RequestQuery;

export async function getWithdrawal(
  api: ApiContext,
  id: string,
  query?: GetWithdrawalQuery,
): Promise<Withdrawal> {
  const { data } = await api.get<Withdrawal>(`/withdrawals/${id}`, query);
  return data;
}

export function useWithdrawal(
  id?: string,
  query?: GetWithdrawalQuery,
  options?: Omit<UseQueryOptions<Withdrawal, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Withdrawal, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Withdrawal, ApiError | AxiosError>(
    ['withdrawals', id],
    () => getWithdrawal(api, id as string, query),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type WithdrawalList = PaginatedList<'withdrawals', Withdrawal>;

export interface GetWithdrawalsQuery extends ListRequestQuery {
  wallet?: string;
}

export async function getWithdrawals(
  api: ApiContext,
  query?: GetWithdrawalsQuery,
): Promise<WithdrawalList> {
  const { data } = await api.get<WithdrawalList>('/withdrawals', query);
  return data;
}

export function useWithdrawals(
  query?: GetWithdrawalsQuery,
  options?: Omit<UseQueryOptions<WithdrawalList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<WithdrawalList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<WithdrawalList, ApiError | AxiosError>(
    ['withdrawals', query],
    () => getWithdrawals(api, query),
    options,
  );
}

export function useActiveWalletWithdrawals(query?: Omit<GetWithdrawalsQuery, 'wallet'>) {
  const wallet = useActiveWallet();
  return useWithdrawals({ ...query, wallet: wallet.data?.id });
}

export interface WithdrawalBody extends RequestBody {
  wallet?: string | null;
  coins?: number | null;
  currency_iso?: string | null;
  receiver_wallet?: string | null;
}

export async function postWithdrawal(api: ApiContext, body: WithdrawalBody): Promise<Withdrawal> {
  const { data } = await api.post<Withdrawal, WithdrawalBody>('/withdrawals', body);
  return data;
}

export function usePostWithdrawal(
  options?: Omit<
    UseMutationOptions<Withdrawal, ApiError | AxiosError, WithdrawalBody>,
    'mutationFn'
  >,
): UseMutationResult<Withdrawal, ApiError | AxiosError, WithdrawalBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Withdrawal, ApiError | AxiosError, WithdrawalBody>(
    (body: WithdrawalBody) => postWithdrawal(api, body),
    {
      onSuccess(withdrawal: Withdrawal) {
        queryClient.setQueryData(['withdrawals', withdrawal.id], withdrawal);
      },
      ...options,
    },
  );
}

export async function putWithdrawal(
  api: ApiContext,
  id: string,
  body: WithdrawalBody,
): Promise<Withdrawal> {
  const { data } = await api.put<Withdrawal, WithdrawalBody>(`/withdrawals/${id}`, body);
  return data;
}

export type PutWithdrawalVariables = WithdrawalBody & { id: string };

export function usePutWithdrawal(
  options?: Omit<
    UseMutationOptions<Withdrawal, ApiError | AxiosError, WithdrawalBody>,
    'mutationFn'
  >,
): UseMutationResult<Withdrawal, ApiError | AxiosError, PutWithdrawalVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Withdrawal, ApiError | AxiosError, PutWithdrawalVariables>(
    async ({ id, ...body }: PutWithdrawalVariables) => putWithdrawal(api, id, body),
    {
      onSuccess(withdrawal: Withdrawal) {
        queryClient.setQueryData(['withdrawals', withdrawal.id], withdrawal);
      },
      ...options,
    },
  );
}
