import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { AxiosError } from 'axios';
import {
  ApiContext,
  ApiError,
  ListRequestQuery,
  PaginatedList,
  RequestBody,
  useApi,
} from '../../api';
import { Asset, AssetType } from './model';
import { Quotation, QuotationHistory } from '../quotations/model';
import { Transaction } from '../transactions/model';
import { PlayerPosition } from '../../soccer/players/model';

export async function getAsset(api: ApiContext, id: string): Promise<Asset> {
  const { data } = await api.get<Asset>(`/assets/${id}`);
  return data;
}

export function useAsset(
  id?: string,
  options?: Omit<UseQueryOptions<Asset, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Asset, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Asset, ApiError | AxiosError>(['assets', id], () => getAsset(api, id as string), {
    ...options,
    enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
  });
}

export type AssetList = PaginatedList<'assets', Asset>;

export interface GetAssetsQuery extends ListRequestQuery {
  type?: AssetType;
  league?: string;
  club?: string;
  asset?: string;
  search?: string;
  player_position?: PlayerPosition;
}

export async function getAssets(api: ApiContext, query?: GetAssetsQuery): Promise<AssetList> {
  const { data } = await api.get<AssetList>('/assets', query);
  return data;
}

export function useAssets(
  query?: GetAssetsQuery,
  options?: Omit<UseQueryOptions<AssetList, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<AssetList, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<AssetList, ApiError | AxiosError>(
    ['assets', query],
    () => getAssets(api, query),
    options,
  );
}

export interface AssetBody extends RequestBody {
  name?: string | null;
  entity?: string | null;
}

export async function postAsset(api: ApiContext, body?: AssetBody): Promise<Asset> {
  const { data } = await api.post<Asset, AssetBody>('/assets', body);
  return data;
}

export function usePostAsset(
  options?: Omit<UseMutationOptions<Asset, ApiError | AxiosError, AssetBody>, 'mutationFn'>,
): UseMutationResult<Asset, ApiError | AxiosError, AssetBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Asset, ApiError | AxiosError, AssetBody>(
    (body: AssetBody) => postAsset(api, body),
    {
      onSuccess(asset: Asset) {
        queryClient.setQueryData(['assets', asset.id], asset);
      },
      ...options,
    },
  );
}

export async function putVariables(api: ApiContext, id: string, body: AssetBody): Promise<Asset> {
  const { data } = await api.put<Asset, AssetBody>(`/assets/${id}`, body);
  return data;
}

export type PutAssetVariables = AssetBody & { id: string };

export function usePutAsset(
  options?: Omit<UseMutationOptions<Asset, ApiError | AxiosError, PutAssetVariables>, 'mutationFn'>,
): UseMutationResult<Asset, ApiError | AxiosError, PutAssetVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Asset, ApiError | AxiosError, PutAssetVariables>(
    ({ id, ...body }: PutAssetVariables) => putVariables(api, id, body),
    {
      onSuccess(asset: Asset) {
        queryClient.setQueryData(['assets', asset.id], asset);
      },
      ...options,
    },
  );
}

export async function getAssetQuotation(api: ApiContext, id: string): Promise<Quotation> {
  const { data } = await api.get<Quotation>(`/assets/${id}/quotation`);
  return data;
}

export function useAssetQuotation(
  id?: string,
  options?: Omit<UseQueryOptions<Quotation, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<Quotation, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<Quotation, ApiError | AxiosError>(
    ['assets', id, 'quotation'],
    () => getAssetQuotation(api, id as string),
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    },
  );
}

export async function getAssetQuotationHistory(
  api: ApiContext,
  id: string,
): Promise<QuotationHistory> {
  const { data } = await api.get<QuotationHistory>(`/assets/${id}/quotation_history`);
  return data;
}

export function useAssetQuotationHistory(
  id?: string,
  options?: Omit<UseQueryOptions<QuotationHistory, ApiError | AxiosError>, 'queryFn' | 'queryKey'>,
): UseQueryResult<QuotationHistory, ApiError | AxiosError> {
  const api = useApi();
  return useQuery<QuotationHistory, ApiError | AxiosError>(
    ['assets', id, 'quotation_history'],
    () => getAssetQuotationHistory(api, id as string),
    { ...options, enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id },
  );
}

export interface AssetAcceptBankProposalBody extends RequestBody {
  wallet?: string;
  nb_shares?: number;
  bank_proposal_quotation?: number;
}

export async function postAssetAcceptBankProposal(
  api: ApiContext,
  id: string,
  body: AssetAcceptBankProposalBody,
): Promise<Transaction> {
  const { data } = await api.post<Transaction, AssetAcceptBankProposalBody>(
    `/assets/${id}/accept_bank_proposal`,
    body,
  );
  return data;
}

export type PostAssetAcceptBankProposalVariables = AssetAcceptBankProposalBody & { id: string };

export function usePostAssetAcceptBankProposal(
  options?: Omit<
    UseMutationOptions<Transaction, ApiError | AxiosError, PostAssetAcceptBankProposalVariables>,
    'mutationFn'
  >,
): UseMutationResult<Transaction, ApiError | AxiosError, PostAssetAcceptBankProposalVariables> {
  const api = useApi();
  return useMutation<Transaction, ApiError | AxiosError, PostAssetAcceptBankProposalVariables>(
    ({ id, ...body }: PostAssetAcceptBankProposalVariables) =>
      postAssetAcceptBankProposal(api, id, body),
    options,
  );
}
