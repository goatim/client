import { PaginatedList, RequestBody, RequestParams, useApi } from '@cezembre/fronts';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import Asset, { AssetType } from './model';

export function useAsset(id?: string): UseQueryResult<Asset> {
  const api = useApi();
  return useQuery<Asset>(
    ['assets', id],
    async () => {
      const { data } = await api.get<Asset>(`/assets/${id}`);
      return data;
    },
    { enabled: !!id },
  );
}

export type AssetList = PaginatedList<'assets', Asset>;

export interface UseAssetsParams extends RequestParams {
  type?: AssetType;
  league?: string;
  club?: string;
  asset?: string;
}

export function useAssets(params?: UseAssetsParams): UseQueryResult<AssetList> {
  const api = useApi();
  return useQuery<AssetList>(['assets', params], async () => {
    const { data } = await api.get<AssetList>('/assets', params);
    return data;
  });
}

export interface AssetBody extends RequestBody {
  name?: string | null;
  entity?: string | null;
  quotation?: number;
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
