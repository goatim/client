import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { ListRequestQuery, PaginatedList, RequestQuery, useApi } from '../../api';
import Asset, { AssetType } from './model';
import Quotation, { QuotationHistory } from '../quotations/model';
import Transaction from '../transactions/model';

export function useAsset(
  assetId?: string,
  query?: RequestQuery,
  initialData?: Asset,
): UseQueryResult<Asset> {
  const api = useApi();
  return useQuery<Asset>(
    ['assets', assetId],
    async () => {
      const { data } = await api.get<Asset>(`/assets/${assetId}`, query);
      return data;
    },
    { enabled: !!assetId, initialData },
  );
}

export type AssetList = PaginatedList<'assets', Asset>;

export interface GetAssetsQuery extends ListRequestQuery {
  type?: AssetType;
  league?: string;
  club?: string;
  asset?: string;
  search?: string;
}

export function useAssets(
  query?: GetAssetsQuery,
  options?: UseQueryOptions<AssetList>,
): UseQueryResult<AssetList> {
  const api = useApi();
  return useQuery<AssetList>(
    ['assets', query],
    async () => {
      const { data } = await api.get<AssetList>('/assets', query);
      return data;
    },
    options,
  );
}

export interface AssetBody {
  name?: string | null;
  entity?: string | null;
}

export function usePostAsset(): UseMutationResult<Asset, unknown, AssetBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Asset, unknown, AssetBody>(
    async (body: AssetBody) => {
      const { data } = await api.post<Asset, AssetBody>('/assets', body);
      return data;
    },
    {
      onSuccess(asset: Asset) {
        queryClient.setQueryData(['assets', asset.id], asset);
      },
    },
  );
}

export type PutAssetVariables = AssetBody & { id: string };

export function usePutAsset(): UseMutationResult<Asset, unknown, PutAssetVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Asset, unknown, PutAssetVariables>(
    async ({ id, ...body }: PutAssetVariables) => {
      const { data } = await api.put<Asset, AssetBody>(`/assets/${id}`, body);
      return data;
    },
    {
      onSuccess(asset: Asset) {
        queryClient.setQueryData(['assets', asset.id], asset);
      },
    },
  );
}

export type AddAssetPictureBody = { illustration: File };

export type AddAssetPictureVariables = AddAssetPictureBody & { id: string };

export function useAddAssetIllustration(): UseMutationResult<
  Asset,
  unknown,
  AddAssetPictureVariables
> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Asset, unknown, AddAssetPictureVariables>(
    async ({ id, illustration }: AddAssetPictureVariables) => {
      const { data } = await api.post<Asset>(`/assets/${id}/illustration`, { illustration });
      return data;
    },
    {
      onSuccess(asset: Asset) {
        queryClient.setQueryData(['assets', asset.id], asset);
      },
    },
  );
}

export function useAssetQuotation(assetId?: string): UseQueryResult<Quotation> {
  const api = useApi();
  return useQuery<Quotation>(
    ['assets', assetId, 'quotation'],
    async () => {
      const { data } = await api.get<Quotation>(`/assets/${assetId}/quotation`);
      return data;
    },
    { enabled: !!assetId },
  );
}

export function useAssetQuotationHistory(assetId?: string): UseQueryResult<QuotationHistory> {
  const api = useApi();
  return useQuery<QuotationHistory>(
    ['assets', assetId, 'quotation_history'],
    async () => {
      const { data } = await api.get<QuotationHistory>(`/assets/${assetId}/quotation_history`);
      return data;
    },
    { enabled: !!assetId },
  );
}

export interface AssetAcceptBankProposalBody {
  wallet?: string;
  nb_shares?: string;
  bank_proposal_quotation?: string;
}

export type PostAssetAcceptBankProposalVariables = AssetAcceptBankProposalBody & { id: string };

export function usePostAssetAcceptBankProposal(): UseMutationResult<
  Transaction,
  unknown,
  PostAssetAcceptBankProposalVariables
> {
  const api = useApi();
  return useMutation<Asset, unknown, PostAssetAcceptBankProposalVariables>(
    async ({ id, ...body }: PostAssetAcceptBankProposalVariables) => {
      const { data } = await api.post<Asset, AssetAcceptBankProposalBody>(
        `/assets/${id}/accept_bank_proposal`,
        body,
      );
      return data;
    },
  );
}
