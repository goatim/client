import { createContext, ReactElement, useCallback, useContext, useMemo, useState } from 'react';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';
import { io, Socket } from 'socket.io-client';
import httpStatus from 'http-status';
import base64 from 'base-64';
import { FormErrors } from '@cezembre/forms';
import { ManagerOptions } from 'socket.io-client/build/esm/manager';
import { SocketOptions } from 'socket.io-client/build/esm/socket';
import { ModelName } from './utils/models';

export interface Model<N extends ModelName = ModelName> {
  __name__?: N;
  id: string;
  creation?: string;
  last_update?: string;
}

export type PaginatedList<N extends string, D = unknown> = {
  [key in N]: D[];
} & {
  total: number;
  url?: string;
  limit?: number;
  page?: number;
  next_page?: number;
  previous_page?: number;
};

export interface ApiErrorData<FE extends FormErrors = FormErrors> {
  status?: number;
  code?: string;
  form_errors?: FE;
  state?: Record<string, unknown>;
  message?: string;
}

export class ApiError<FE extends FormErrors = FormErrors> extends Error implements ApiErrorData {
  readonly __FLAG__ = 'ApiError';

  status?: number;

  code?: string;

  form_errors?: FE;

  state?: Record<string, unknown>;

  constructor(error: Error | ApiErrorData<FE> | string) {
    if (error instanceof Error) {
      super(error.message);
    } else if (typeof error === 'object') {
      super(error.message);

      this.status = error.status;
      this.code = error.code;
      this.form_errors = error.form_errors;
      this.state = error.state;
    } else {
      super(error);

      this.status = httpStatus.BAD_REQUEST;
    }
  }
}

export function isApiError(error: unknown): boolean {
  return !!(
    error &&
    typeof error === 'object' &&
    '__FLAG__' in error &&
    error instanceof ApiError &&
    error.__FLAG__ &&
    error.__FLAG__ === 'ApiError'
  );
}

export interface RequestBody {
  [key: string]: unknown;
}

export function buildRequestBody<B extends RequestBody = RequestBody>(body: B): FormData {
  const formData = new FormData();

  Object.entries(body).forEach(([param, value]) => {
    if (value === null) {
      formData.append(param, '');
    } else if (typeof value === 'string') {
      formData.append(param, value);
    } else if (typeof value === 'number') {
      formData.append(param, value.toString(10));
    } else if (typeof value === 'boolean') {
      formData.append(param, value.toString());
    } else if (typeof value === 'object') {
      if (value instanceof Blob) {
        formData.append(param, value);
      } else if ('toString' in value && value.toString && typeof value.toString === 'function') {
        formData.append(param, value.toString());
      } else {
        formData.append(param, JSON.stringify(value));
      }
    }
  });

  return formData;
}

export interface ApiConfig {
  host?: string | null;
  api_key?: string | null;
  locale?: string | null;
  bearer_token?: string | null;
}

export interface RequestQuery {
  expand?: string;
  'expand[]'?: string;
  required_permissions?: string;
  required_permissions_mode?: string;
}

export interface ListRequestQuery extends RequestQuery {
  order?: string;
  limit?: number;
  page?: number;
}

export function buildRequestConfig<Q extends RequestQuery = RequestQuery>(
  apiConfig?: ApiConfig,
  query?: Q,
): AxiosRequestConfig {
  const headers: RawAxiosRequestHeaders = {};

  if (apiConfig?.api_key) {
    headers['X-Api-Key'] = apiConfig.api_key;
  }

  if (apiConfig?.bearer_token) {
    headers.Authorization = `Bearer ${apiConfig.bearer_token}`;
  }

  if (apiConfig?.locale) {
    headers['X-locale'] = apiConfig.locale;
  }

  return {
    headers,
    params: query,
  };
}

function parseError(error: unknown): ApiError {
  if (!error) {
    return new ApiError('Unknown error');
  }
  if (typeof error === 'object') {
    if ('response' in error && (error as AxiosError).response) {
      const { response } = error as AxiosError<ApiErrorData>;
      if (response?.data) {
        return new ApiError({ ...response.data, status: response.status });
      }
    }
    return new ApiError(error as Error);
  }
  if (typeof error === 'string') {
    return new ApiError(error);
  }
  return new ApiError('Unknown error');
}

export async function apiGet<D = unknown, Q extends RequestQuery = RequestQuery>(
  url: string,
  apiConfig?: ApiConfig,
  query?: Q,
): Promise<AxiosResponse<D>> {
  const config = buildRequestConfig<Q>(apiConfig, query);

  try {
    return await axios.get<D>((apiConfig?.host || '') + url, config);
  } catch (error: unknown) {
    throw parseError(error);
  }
}

export async function apiPost<
  D = unknown,
  B extends RequestBody = RequestBody,
  Q extends RequestQuery = RequestQuery,
>(url: string, body?: B, apiConfig?: ApiConfig, query?: Q): Promise<AxiosResponse<D>> {
  const config = buildRequestConfig<Q>(apiConfig, query);

  try {
    return await axios.post<D>(
      (apiConfig?.host || '') + url,
      body ? buildRequestBody<B>(body) : undefined,
      config,
    );
  } catch (error: unknown) {
    throw parseError(error);
  }
}

export async function apiPut<
  D = unknown,
  B extends RequestBody = RequestBody,
  Q extends RequestQuery = RequestQuery,
>(url: string, body?: B, apiConfig?: ApiConfig, query?: Q): Promise<AxiosResponse<D>> {
  const config = buildRequestConfig<Q>(apiConfig, query);

  try {
    return await axios.put<D>(
      (apiConfig?.host || '') + url,
      body ? buildRequestBody<B>(body) : undefined,
      config,
    );
  } catch (error: unknown) {
    throw parseError(error);
  }
}

export async function apiDelete<D = unknown, Q extends RequestQuery = RequestQuery>(
  url: string,
  apiConfig?: ApiConfig,
  query?: Q,
): Promise<AxiosResponse<D>> {
  const config = buildRequestConfig<Q>(apiConfig, query);

  try {
    return await axios.delete<D>((apiConfig?.host || '') + url, config);
  } catch (error: unknown) {
    throw parseError(error);
  }
}

export interface ApiContext {
  config?: ApiConfig;

  setConfig(config: ApiConfig): void;

  setHost(host?: string | null): void;
  setApiKey(apiKey?: string | null): void;
  setLocale(locale?: string | null): void;
  setBearerToken(bearerToken?: string | null): void;

  get<D = unknown, Q extends RequestQuery = RequestQuery>(
    route: string,
    query?: Q,
  ): Promise<AxiosResponse<D>>;
  post<D = unknown, B extends RequestBody = RequestBody, Q extends RequestQuery = RequestQuery>(
    route: string,
    body?: B,
    query?: Q,
  ): Promise<AxiosResponse<D>>;
  put<D = unknown, B extends RequestBody = RequestBody, Q extends RequestQuery = RequestQuery>(
    route: string,
    body?: B,
    query?: Q,
  ): Promise<AxiosResponse<D>>;
  delete<D = unknown, Q extends RequestQuery = RequestQuery>(
    route: string,
    query?: Q,
  ): Promise<AxiosResponse<D>>;

  createSocket: (namespace?: string, opts?: Partial<ManagerOptions & SocketOptions>) => Socket;
}

const apiContext = createContext<ApiContext | undefined>(undefined);

export function useApi(): ApiContext {
  const context = useContext<ApiContext | undefined>(apiContext);
  if (!context) {
    throw new Error('Missing api context');
  }
  return context;
}

const API_CONFIG_STORAGE_KEY = base64.encode('friday_api_config');

function storeConfig(config?: ApiConfig): void {
  if (window) {
    window.localStorage.setItem(API_CONFIG_STORAGE_KEY, base64.encode(JSON.stringify(config)));
  }
}

function hydrateConfig(config?: ApiConfig): ApiConfig | undefined {
  let storedConfig: ApiConfig | undefined;
  if (window) {
    const raw = window.localStorage.getItem(API_CONFIG_STORAGE_KEY);
    if (raw) {
      storedConfig = JSON.parse(base64.decode(raw)) as ApiConfig;
    }
  }

  if (storedConfig) {
    return storedConfig;
  }

  storeConfig(config);

  return config;
}

export interface Props {
  children?: ReactElement;
  config?: ApiConfig;
  persistConfig?: boolean;
}

export function ApiProvider({ children, config, persistConfig = true }: Props): ReactElement {
  const [apiConfig, setApiConfig] = useState<ApiConfig | undefined>(
    persistConfig ? hydrateConfig(config) : config,
  );

  const setConfig = useCallback(
    (_config: ApiConfig) => {
      setApiConfig(_config);
      if (persistConfig) {
        storeConfig(_config);
      }
    },
    [persistConfig],
  );

  const setHost = useCallback(
    (host: string | null) => {
      setApiConfig((oldConfig) => {
        const newConfig: ApiConfig = { ...oldConfig, host };
        if (persistConfig) {
          storeConfig(newConfig);
        }
        return newConfig;
      });
    },
    [persistConfig],
  );

  const setApiKey = useCallback(
    (apiKey: string | null) => {
      setApiConfig((oldConfig) => {
        const newConfig: ApiConfig = { ...oldConfig, api_key: apiKey };
        if (persistConfig) {
          storeConfig(newConfig);
        }
        return newConfig;
      });
    },
    [persistConfig],
  );

  const setLocale = useCallback(
    (locale: string | null) => {
      setApiConfig((oldConfig) => {
        const newConfig: ApiConfig = { ...oldConfig, locale };
        if (persistConfig) {
          storeConfig(newConfig);
        }
        return newConfig;
      });
    },
    [persistConfig],
  );

  const setBearerToken = useCallback(
    (bearerToken: string | null) => {
      setApiConfig((oldConfig) => {
        const newConfig: ApiConfig = { ...oldConfig, bearer_token: bearerToken };
        if (persistConfig) {
          storeConfig(newConfig);
        }
        return newConfig;
      });
    },
    [persistConfig],
  );

  const createSocket = useCallback(
    (namespace?: string, opts?: Partial<ManagerOptions & SocketOptions>): Socket => {
      return io((apiConfig?.host || '') + namespace, {
        ...opts,
        auth: {
          api_key: apiConfig?.api_key,
          bearer_token: apiConfig?.bearer_token,
        },
      });
    },
    [apiConfig?.api_key, apiConfig?.bearer_token, apiConfig?.host],
  );

  const value = useMemo<ApiContext>(
    () => ({
      config: apiConfig,
      setConfig,
      setHost,
      setApiKey,
      setLocale,
      setBearerToken,
      get: (route: string, query?: RequestQuery) => apiGet(route, apiConfig, query),
      post: (route: string, body?: RequestBody, query?: RequestQuery) =>
        apiPost(route, body, apiConfig, query),
      put: (route: string, body?: RequestBody, query?: RequestQuery) =>
        apiPut(route, body, apiConfig, query),
      delete: (route: string, query?: RequestQuery) => apiDelete(route, apiConfig, query),
      createSocket,
    }),
    [apiConfig, createSocket, setApiKey, setBearerToken, setConfig, setHost, setLocale],
  );

  return <apiContext.Provider value={value}>{children}</apiContext.Provider>;
}
