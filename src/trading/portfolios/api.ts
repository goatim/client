import { PaginatedList, RequestBody, RequestParams, useApi } from '@cezembre/fronts';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import Portfolio from './model';
import { useCurrentWallet } from '../../market/wallets/api';

export function usePortfolio(id?: string): UseQueryResult<Portfolio> {
  const api = useApi();
  return useQuery<Portfolio>(
    ['portfolios', id],
    async () => {
      const { data } = await api.get<Portfolio>(`/portfolios/${id}`);
      return data;
    },
    { enabled: !!id },
  );
}

export type PortfolioList = PaginatedList<'portfolios', Portfolio>;

export interface UsePortfoliosParams extends RequestParams {
  wallet?: string;
}

export function usePortfolios(params?: UsePortfoliosParams): UseQueryResult<PortfolioList> {
  const api = useApi();
  return useQuery<PortfolioList>(['portfolios', params], async () => {
    const { data } = await api.get<PortfolioList>('/portfolios', params);
    return data;
  });
}

export function useCurrentWalletPortfolios(params?: Omit<UsePortfoliosParams, 'wallet'>) {
  const wallet = useCurrentWallet();
  return usePortfolios({ ...params, wallet: wallet.data?.id });
}

export interface PortfolioBody extends RequestBody {
  wallet?: string | null;
  asset?: string | null;
  quantity?: number;
  buy_price?: number;
}

export function useCreatePortfolio(): UseMutationResult<Portfolio, unknown, PortfolioBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Portfolio, unknown, PortfolioBody>(
    async (body: PortfolioBody) => {
      const { data } = await api.post<Portfolio>('/portfolios', body);
      return data;
    },
    {
      onSuccess(portfolio: Portfolio) {
        queryClient.setQueryData(['portfolios', portfolio.id], portfolio);
      },
    },
  );
}

export type UpdatePortfolioVariables = PortfolioBody & { id: string };

export function useUpdatePortfolio(): UseMutationResult<
  Portfolio,
  unknown,
  UpdatePortfolioVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Portfolio, unknown, UpdatePortfolioVariables>(
    async ({ id, ...body }: UpdatePortfolioVariables) => {
      const { data } = await api.put<Portfolio>(`/portfolios/${body}`, body);
      return data;
    },
    {
      onSuccess(portfolio: Portfolio) {
        queryClient.setQueryData(['portfolios', portfolio.id], portfolio);
      },
    },
  );
}

export function useDeletePortfolio(id: string): UseMutationResult<void, unknown, void> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<void, unknown, void>(
    async () => {
      await api.delete<void>(`/portfolios/${id}`);
    },
    {
      onSuccess() {
        queryClient.removeQueries(['portfolios', id], { exact: true });
        // TODO : Remove in list
      },
    },
  );
}
