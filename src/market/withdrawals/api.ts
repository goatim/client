import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { ListRequestParams, PaginatedList, RequestBody, RequestParams, useApi } from '../../api';
import Withdrawal from './model';
import { useCurrentWallet } from '../wallets/api';

export function useWithdrawal(id?: string, params?: RequestParams): UseQueryResult<Withdrawal> {
  const api = useApi();
  return useQuery<Withdrawal>(
    ['withdrawals', id],
    async () => {
      const { data } = await api.get<Withdrawal>(`/withdrawals/${id}`, params);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}

export type WithdrawalList = PaginatedList<'withdrawals', Withdrawal>;

export interface GetWithdrawalsParams extends ListRequestParams {
  wallet?: string;
}

export function useWithdrawals(
  params?: GetWithdrawalsParams,
): UseQueryResult<WithdrawalList> | undefined {
  const api = useApi();
  return useQuery<WithdrawalList>(['withdrawals', params], async () => {
    const { data } = await api.get<WithdrawalList>('/withdrawals', params);
    return data;
  });
}

export function useCurrentWalletWithdrawals(params?: Omit<GetWithdrawalsParams, 'wallet'>) {
  const wallet = useCurrentWallet();
  return useWithdrawals({ ...params, wallet: wallet.data?.id });
}

export interface WithdrawalBody extends RequestBody {
  wallet?: string | null;
  amount_asked?: number | null;
  currency_iso?: string | null;
  receiver_wallet?: string | null;
}

export function useCreateWithdrawal(): UseMutationResult<Withdrawal, unknown, WithdrawalBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Withdrawal, unknown, WithdrawalBody>(
    async (body: WithdrawalBody) => {
      const { data } = await api.post<Withdrawal>('/withdrawals', body);
      return data;
    },
    {
      onSuccess(withdrawal: Withdrawal) {
        queryClient.setQueryData(['withdrawals', withdrawal.id], withdrawal);
      },
    },
  );
}

export type UpdateWithdrawalVariables = WithdrawalBody & { id: string };

export function useUpdateWithdrawal(): UseMutationResult<
  Withdrawal,
  unknown,
  UpdateWithdrawalVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Withdrawal, unknown, UpdateWithdrawalVariables>(
    async ({ id, ...body }: UpdateWithdrawalVariables) => {
      const { data } = await api.put<Withdrawal>(`/withdrawals/${body}`, body);
      return data;
    },
    {
      onSuccess(withdrawal: Withdrawal) {
        queryClient.setQueryData(['withdrawals', withdrawal.id], withdrawal);
      },
    },
  );
}
