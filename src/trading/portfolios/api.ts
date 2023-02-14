import { useQuery, UseQueryResult } from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { ListRequestQuery, PaginatedList, useApi } from '../../api';
import Portfolio from './model';
import { useActiveWallet } from '../../market/wallets/api';

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

export function usePortfolios(
  query?: GetPortfoliosQuery,
  options?: UseQueryOptions<PortfolioList>,
): UseQueryResult<PortfolioList> {
  const api = useApi();
  return useQuery<PortfolioList>(
    ['portfolios', query],
    async () => {
      const { data } = await api.get<PortfolioList>('/portfolios', query);
      return data;
    },
    options,
  );
}

export function useActiveWalletPortfolios(query?: Omit<GetPortfoliosQuery, 'wallet'>) {
  const wallet = useActiveWallet();
  return usePortfolios({ ...query, wallet: wallet.data?.id }, { enabled: !!wallet.data?.id });
}
