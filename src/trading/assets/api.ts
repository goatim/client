import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { PaginatedList, RequestBody, RequestParams, useApi } from '../../api';
import Asset, { AssetType } from './model';
import Quotation, { QuotationHistory } from '../quotations/model';

export function useAsset(
  assetId?: string,
  params?: RequestParams,
  initialData?: Asset,
): UseQueryResult<Asset> {
  const api = useApi();
  return useQuery<Asset>(
    ['assets', assetId],
    async () => {
      const { data } = await api.get<Asset>(`/assets/${assetId}`, params);
      return data;
    },
    { enabled: !!assetId, initialData },
  );
}

export type AssetList = PaginatedList<'assets', Asset>;

export interface GetAssetsParams extends RequestParams {
  type?: AssetType;
  league?: string;
  club?: string;
  asset?: string;
  search?: string;
}

export function useAssets(params?: GetAssetsParams): UseQueryResult<AssetList> {
  const api = useApi();
  return useQuery<AssetList>(['assets', params], async () => {
    const { data } = await api.get<AssetList>('/assets', params);
    return data;
  });
}

export interface AssetBody extends RequestBody {
  name?: string | null;
  entity?: string | null;
}

export function useCreateAsset(): UseMutationResult<Asset, unknown, AssetBody> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Asset, unknown, AssetBody>(
    async (body: AssetBody) => {
      const { data } = await api.post<Asset>('/assets', body);
      return data;
    },
    {
      onSuccess(asset: Asset) {
        queryClient.setQueryData(['assets', asset.id], asset);
      },
    },
  );
}

export type UpdateAssetVariables = AssetBody & { id: string };

export function useUpdateAsset(): UseMutationResult<Asset, unknown, UpdateAssetVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<Asset, unknown, UpdateAssetVariables>(
    async ({ id, ...body }: UpdateAssetVariables) => {
      const { data } = await api.put<Asset>(`/assets/${body}`, body);
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
