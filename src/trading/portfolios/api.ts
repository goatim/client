import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiContext, ApiError, ListRequestQuery, PaginatedList, useApi } from '../../api';
import { Portfolio } from './model';
import { useActiveWallet } from '../../market';
import { Transaction } from '../transactions';

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
  asset?: string;
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

export interface SellPortfolioToBankBody {
  nb_shares?: string;
  bank_proposal?: string;
}

export async function sellPortfolioToBank(
  api: ApiContext,
  id: string,
  body: SellPortfolioToBankBody,
): Promise<Transaction> {
  const { data } = await api.put<Transaction, SellPortfolioToBankBody>(
    `/portfolios/${id}/sell_to_bank`,
    body,
  );
  return data;
}

export type SellPortfolioToBankVariables = SellPortfolioToBankBody & { id: string };

export function useSellPortfolioToBank(
  options?: Omit<
    UseMutationOptions<Transaction, ApiError | AxiosError, SellPortfolioToBankVariables>,
    'mutationFn'
  >,
): UseMutationResult<Transaction, ApiError | AxiosError, SellPortfolioToBankVariables> {
  const api = useApi();
  return useMutation<Transaction, ApiError | AxiosError, SellPortfolioToBankVariables>(
    ({ id, ...body }: SellPortfolioToBankVariables) => sellPortfolioToBank(api, id, body),
    options,
  );
}
