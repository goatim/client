import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { ListRequestQuery, PaginatedList, RequestBody, RequestQuery, useApi } from '../../api';
import Withdrawal from './model';
import { useCurrentWallet } from '../wallets/api';

export function useWithdrawal(id?: string, query?: RequestQuery): UseQueryResult<Withdrawal> {
  const api = useApi();
  return useQuery<Withdrawal>(
    ['withdrawals', id],
    async () => {
      const { data } = await api.get<Withdrawal>(`/withdrawals/${id}`, query);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export type WithdrawalList = PaginatedList<'withdrawals', Withdrawal>;

export interface GetWithdrawalsQuery extends ListRequestQuery {
  wallet?: string;
}

export function useWithdrawals(
  query?: GetWithdrawalsQuery,
): UseQueryResult<WithdrawalList> | undefined {
  const api = useApi();
  return useQuery<WithdrawalList>(['withdrawals', query], async () => {
    const { data } = await api.get<WithdrawalList>('/withdrawals', query);
    return data;
  });
}

export function useCurrentWalletWithdrawals(query?: Omit<GetWithdrawalsQuery, 'wallet'>) {
  const wallet = useCurrentWallet();
  return useWithdrawals({ ...query, wallet: wallet.data?.id });
}

export interface WithdrawalBody extends RequestBody {
  wallet?: string | null;
  amount?: number | null;
  currency_iso?: string | null;
  receiver_wallet?: string | null;
}

export function usePostWithdrawal(): UseMutationResult<Withdrawal, unknown, WithdrawalBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Withdrawal, unknown, WithdrawalBody>(
    async (body: WithdrawalBody) => {
      const { data } = await api.post<Withdrawal, WithdrawalBody>('/withdrawals', body);
      return data;
    },
    {
      onSuccess(withdrawal: Withdrawal) {
        queryClient.setQueryData(['withdrawals', withdrawal.id], withdrawal);
      },
    },
  );
}

export type PutWithdrawalVariables = WithdrawalBody & { id: string };

export function usePutWithdrawal(): UseMutationResult<Withdrawal, unknown, PutWithdrawalVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Withdrawal, unknown, PutWithdrawalVariables>(
    async ({ id, ...body }: PutWithdrawalVariables) => {
      const { data } = await api.put<Withdrawal, WithdrawalBody>(`/withdrawals/${id}`, body);
      return data;
    },
    {
      onSuccess(withdrawal: Withdrawal) {
        queryClient.setQueryData(['withdrawals', withdrawal.id], withdrawal);
      },
    },
  );
}
