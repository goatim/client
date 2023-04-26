import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiContext, ApiError, ListRequestQuery, PaginatedList, useApi } from '../../api';
import { Portfolio } from './model';
import { useActiveWallet } from '../../market';

export async function getPortfolio(api: ApiContext, id: string): Promise<Portfolio> {
  const { data } = await api.get<Portfolio>(`/portfolios/${id}`);
  return data;
}

export function usePortfolio(
  id?: string,
  options?: Omit<UseQueryOptions<Portfolio, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Portfolio, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Portfolio, ApiError | AxiosError>(
    ['portfolios', id],
    () => getPortfolio(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export type PortfolioList = PaginatedList<'portfolios', Portfolio>;

export interface GetPortfoliosQuery extends ListRequestQuery {
  wallet?: string;
}

export async function getPortfolios(
  api: ApiContext,
  query?: GetPortfoliosQuery,
): Promise<PortfolioList> {
  const { data } = await api.get<PortfolioList>('/portfolios', query);
  return data;
}

export function usePortfolios(
  query?: GetPortfoliosQuery,
  options?: Omit<UseQueryOptions<PortfolioList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<PortfolioList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<PortfolioList, ApiError | AxiosError>(
    ['portfolios', query],
    () => getPortfolios(api, query),
    options,
  );
}

export function useActiveWalletPortfolios(
  query?: Omit<GetPortfoliosQuery, 'wallet'>,
  options?: Omit<UseQueryOptions<PortfolioList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
) {
  const wallet = useActiveWallet();
  return usePortfolios(
    { ...query, wallet: wallet.data?.id },
    { enabled: !!wallet.data?.id, ...options },
  );
}
