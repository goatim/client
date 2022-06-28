import { useQuery, UseQueryResult } from 'react-query';
import { PaginatedList, RequestParams, useApi } from '../../api';
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
