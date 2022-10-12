import { useQuery, UseQueryResult } from 'react-query';
import { ListRequestQuery, PaginatedList, useApi } from '../../api';
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

export interface GetPortfoliosQuery extends ListRequestQuery {
  wallet?: string;
}

export function usePortfolios(query?: GetPortfoliosQuery): UseQueryResult<PortfolioList> {
  const api = useApi();
  return useQuery<PortfolioList>(['portfolios', query], async () => {
    const { data } = await api.get<PortfolioList>('/portfolios', query);
    return data;
  });
}

export function useCurrentWalletPortfolios(query?: Omit<GetPortfoliosQuery, 'wallet'>) {
  const wallet = useCurrentWallet();
  return usePortfolios({ ...query, wallet: wallet.data?.id });
}
